import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { MOCK_WORKOUTS } from '../constants/mockWorkouts';
import { Workout } from '../components/WorkoutItem';

// ─── Types ───────────────────────────────────────────────────────────────────

type WorkoutContextType = {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  loadWorkouts: () => void;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  /** Load initial workouts (mock data) */
  const loadWorkouts = useCallback(() => {
    setWorkouts(MOCK_WORKOUTS);
  }, []);

  /** Add a new workout to the list */
  const addWorkout = useCallback((workout: Workout) => {
    setWorkouts((prev) => [workout, ...prev]);
  }, []);

  /** Delete a workout by id */
  const deleteWorkout = useCallback((id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // Load on mount
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, deleteWorkout, loadWorkouts }}>
      {children}
    </WorkoutContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────

export function useWorkouts(): WorkoutContextType {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
}