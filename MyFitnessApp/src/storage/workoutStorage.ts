import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../components/WorkoutItem";

const STORAGE_KEY = "@myfitnessapp:workouts";
const FAVORITES_KEY = "@myfitnessapp:favorites"; // 🆕

// ─── Workouts ────────────────────────────────────────────────────────────────

export async function saveWorkouts(workouts: Workout[]): Promise<void> {
  try {
    const json = JSON.stringify(workouts);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error("[workoutStorage] Failed to save workouts:", error);
    throw error;
  }
}

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

export async function clearWorkouts(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("[workoutStorage] Failed to clear workouts:", error);
    throw error;
  }
}

// ─── Favorites 🆕 ────────────────────────────────────────────────────────────

export async function saveFavorites(favorites: string[]): Promise<void> {
  try {
    const json = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, json);
  } catch (error) {
    console.error("[workoutStorage] Failed to save favorites:", error);
    throw error;
  }
}

export async function getFavorites(): Promise<string[]> {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    if (json === null) return [];
    return JSON.parse(json) as string[];
  } catch (error) {
    console.error("[workoutStorage] Failed to load favorites:", error);
    throw error;
  }
}

export async function clearFavorites(): Promise<void> {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error("[workoutStorage] Failed to clear favorites:", error);
    throw error;
  }
}