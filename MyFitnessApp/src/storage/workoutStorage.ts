import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../components/WorkoutItem";

const STORAGE_KEY = "@myfitnessapp:workouts";

// ─── Save ────────────────────────────────────────────────────────────────────

export async function saveWorkouts(workouts: Workout[]): Promise<void> {
  try {
    const json = JSON.stringify(workouts);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error("[workoutStorage] Failed to save workouts:", error);
    throw error;
  }
}

// ─── Load ────────────────────────────────────────────────────────────────────

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (json === null) return [];
    return JSON.parse(json) as Workout[];
  } catch (error) {
    console.error("[workoutStorage] Failed to load workouts:", error);
    throw error;
  }
}

// ─── Clear (utility for dev/testing) ─────────────────────────────────────────

export async function clearWorkouts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("[workoutStorage] Failed to clear workouts:", error);
    throw error;
  }
}
