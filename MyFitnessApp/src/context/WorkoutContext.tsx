import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Workout } from "../components/WorkoutItem";
import { getWorkouts, saveWorkouts } from "../storage/workoutStorage";
import { MOCK_WORKOUTS } from "../constants/mockWorkouts";

// ─── Types ───────────────────────────────────────────────────────────────────

type WorkoutContextType = {
  workouts: Workout[];
  isLoading: boolean;
  storageError: string | null;
  addWorkout: (workout: Workout) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  loadWorkouts: () => Promise<void>;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  // ─── Load workouts from AsyncStorage on mount ──────────────────────────────

  const loadWorkouts = useCallback(async () => {
    setIsLoading(true);
    setStorageError(null);
    try {
      const stored = await getWorkouts();
      // Seed mock data only on first launch (empty storage)
      setWorkouts(stored.length > 0 ? stored : MOCK_WORKOUTS);

      // Persist mock data so subsequent launches load from storage
      if (stored.length === 0) {
        await saveWorkouts(MOCK_WORKOUTS);
      }
    } catch {
      setStorageError("Failed to load workouts. Please restart the app.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ─── Add ──────────────────────────────────────────────────────────────────

  const addWorkout = useCallback(
    async (workout: Workout) => {
      try {
        const updated = [workout, ...workouts];
        await saveWorkouts(updated);
        setWorkouts(updated);
      } catch {
        setStorageError("Failed to save workout. Please try again.");
      }
    },
    [workouts],
  );

  // ─── Delete ───────────────────────────────────────────────────────────────

  const deleteWorkout = useCallback(
    async (id: string) => {
      try {
        const updated = workouts.filter((w) => w.id !== id);
        await saveWorkouts(updated);
        setWorkouts(updated);
      } catch {
        setStorageError("Failed to delete workout. Please try again.");
      }
    },
    [workouts],
  );

  // Load on mount
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        isLoading,
        storageError,
        addWorkout,
        deleteWorkout,
        loadWorkouts,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

export function useWorkouts(): WorkoutContextType {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
}
