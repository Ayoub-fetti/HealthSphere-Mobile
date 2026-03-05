// ─── Types ────────────────────────────────────────────────────────────────────

export type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

export type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// ─── Config ───────────────────────────────────────────────────────────────────

const API_BASE_URL = 'https://api.api-ninjas.com/v1/exercises';
const API_KEY = process.env.EXPO_PUBLIC_API_NINJAS_KEY ?? '';
const TIMEOUT_MS = 8000;

// ─── Fetch Exercises ──────────────────────────────────────────────────────────

export async function fetchExercises(
  muscle?: string
): Promise<ApiResponse<Exercise[]>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const url = muscle
    ? `${API_BASE_URL}?muscle=${encodeURIComponent(muscle)}`
    : API_BASE_URL;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // ─── HTTP Error ──────────────────────────────────────────────────────────
    if (!response.ok) {
      const status = response.status;

      if (status === 401) {
        return {
          data: null,
          loading: false,
          error: 'Invalid API key. Please check your API Ninjas key.',
        };
      }
      if (status === 429) {
        return {
          data: null,
          loading: false,
          error: 'Too many requests. Please wait a moment and try again.',
        };
      }
      return {
        data: null,
        loading: false,
        error: `Server error (${status}). Please try again later.`,
      };
    }

    const data: Exercise[] = await response.json();

    return { data, loading: false, error: null };
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    // ─── Timeout ─────────────────────────────────────────────────────────────
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        data: null,
        loading: false,
        error: 'Request timed out. Check your connection and try again.',
      };
    }

    // ─── Network Error ────────────────────────────────────────────────────────
    return {
      data: null,
      loading: false,
      error: 'Network error. Please check your internet connection.',
    };
  }
}