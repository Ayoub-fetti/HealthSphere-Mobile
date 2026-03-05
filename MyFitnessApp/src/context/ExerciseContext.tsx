import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Exercise } from '../services/apiService';
import { getFavorites, saveFavorites } from '../storage/workoutStorage';

// ─── State & Action Types ─────────────────────────────────────────────────────

type ExerciseState = {
  exercises: Exercise[];
  favorites: string[];       // array of exercise names (used as IDs)
  loading: boolean;
  error: string | null;
};

type ExerciseAction =
  | { type: 'FETCH_START' }
  | { type: 'SET_EXERCISES'; payload: Exercise[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'SET_FAVORITES'; payload: string[] };

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: ExerciseState = {
  exercises: [],
  favorites: [],
  loading: false,
  error: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function exerciseReducer(
  state: ExerciseState,
  action: ExerciseAction,
): ExerciseState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };

    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload, loading: false, error: null };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'TOGGLE_FAVORITE': {
      const name = action.payload;
      const already = state.favorites.includes(name);
      const updated = already
        ? state.favorites.filter((f) => f !== name)
        : [...state.favorites, name];
      return { ...state, favorites: updated };
    }

    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };

    default:
      return state;
  }
}

// ─── Context Type ─────────────────────────────────────────────────────────────

type ExerciseContextType = {
  exercises: Exercise[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<ExerciseAction>;
  isFavorite: (name: string) => boolean;
  toggleFavorite: (name: string) => Promise<void>;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ExerciseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // ─── Load persisted favorites on mount ──────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const stored = await getFavorites();
        dispatch({ type: 'SET_FAVORITES', payload: stored });
      } catch {
        console.error('[ExerciseContext] Failed to load favorites');
      }
    })();
  }, []);

  // ─── Persist favorites whenever they change ──────────────────────────────────
  useEffect(() => {
    saveFavorites(state.favorites).catch(() =>
      console.error('[ExerciseContext] Failed to persist favorites'),
    );
  }, [state.favorites]);

  // ─── Toggle favorite + persist ───────────────────────────────────────────────
  const toggleFavorite = useCallback(async (name: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: name });
    // persistence is handled by the useEffect above
  }, []);

  // ─── Helper ──────────────────────────────────────────────────────────────────
  const isFavorite = useCallback(
    (name: string) => state.favorites.includes(name),
    [state.favorites],
  );

  return (
    <ExerciseContext.Provider
      value={{
        exercises: state.exercises,
        favorites: state.favorites,
        loading: state.loading,
        error: state.error,
        dispatch,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

export function useExercises(): ExerciseContextType {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
}