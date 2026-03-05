📝 HealthSphere V2 - Project Roadmap
Last updated: 2026-03-05


📂 1. Architecture Refactor

Since you are using Expo Router (app directory), we need to ensure the "Navigation Advanced" requirement is met using file-based routing.

    [x] Install Missing Navigation ✅
        @react-navigation/drawer and @react-native-community/netinfo are already in package.json.

    [ ] Fix app/_layout.tsx ✅
        Currently uses NavigationContainer + AppNavigator (stack-based).
        Replace with GestureHandlerRootView + Expo Router <Drawer> layout.
        Remove the NavigationContainer wrapper — Expo Router manages its own navigation.
        Keep WorkoutProvider wrapping the Drawer.

    [ ] Restructure app/ to match the suggested navigation structure: ✅
        Create app/(drawer)/_layout.tsx  → Drawer root
        Move app/(tabs)/ inside app/(drawer)/(tabs)/

    [ ] Setup 3 Tabs in app/(drawer)/(tabs)/_layout.tsx ✅
        Currently only has 2 tabs: Home + Explore (both are Expo template screens).
        Replace with:
            🏠 index.tsx     → Dashboard
            💪 exercises.tsx → Exercise Catalog (new)
            📊 history.tsx   → History (port logic from src/screens/HomeScreen.tsx)

    [ ] Add Drawer-only screens: ✅
        app/(drawer)/profile.tsx   (Drawer item)
        app/(drawer)/settings.tsx  (Drawer item)

    [ ] Map src/ screens to app/ ✅
        Reference or move AddWorkoutScreen and WorkoutDetailsScreen into
        app/(drawer)/ so they are reachable via Expo Router links/navigation.

🌐 2. API & Services (src/services/)

Goal: Fetch real data from an external source.

    [ ] Choose API ✅
        Recommended: API Ninjas Exercises (free, no billing required).
        Alternative: ExerciseDB (RapidAPI).

    [ ] Create src/services/apiService.ts ✅
        Implement fetchExercises(muscle?: string) function.
        Use fetch with AbortController timeout (or axios with timeout option).
        Return a typed ApiResponse<Exercise[]> object.

    [ ] Add Error Handling ✅
        Standard response shape: { data: T | null, loading: boolean, error: string | null }

🧠 3. Global State (src/context/)

Goal: Centralize Exercise and Favorite data.

    [ ] Create src/context/ExerciseContext.tsx ⚠️ NOT DONE
        (WorkoutContext exists but covers only workouts — do not modify it for exercises.)
        State: exercises array + favorites (array of exercise IDs).

    [ ] Implement Reducer ⚠️ NOT DONE
        Use useReducer with actions: FETCH_START | SET_EXERCISES | TOGGLE_FAVORITE

    [ ] Persistence ⚠️ NOT DONE
        Update src/storage/workoutStorage.ts to add saveFavorites / getFavorites
        using a separate AsyncStorage key.

📡 4. Offline-First Strategy

Goal: App must work without internet.

    [ ] Create src/hooks/useNetwork.ts ⚠️ NOT DONE
        Use @react-native-community/netinfo to subscribe to connection changes.
        Return { isConnected: boolean }.

    [ ] Sync Logic ⚠️ NOT DONE
        In ExerciseContext:
            If Online  → fetchExercises() → dispatch SET_EXERCISES → save to AsyncStorage.
            If Offline → load from AsyncStorage → dispatch SET_EXERCISES.

    [ ] UI Feedback ⚠️ NOT DONE
        Add a small "Offline Mode" banner in app/(drawer)/(tabs)/_layout.tsx header.

📱 5. New Screens Development

    [ ] Dashboard — app/(drawer)/(tabs)/index.tsx ⚠️ CONFLICT
        Currently the Expo starter template. Replace entirely.
        Show: Total Workouts count (from WorkoutContext).
        Show: Favorite Exercises count (from ExerciseContext).

    [ ] Exercises Catalog — app/(drawer)/(tabs)/exercises.tsx ⚠️ NOT DONE
        FlatList of exercises fetched from API.
        Search bar + muscle/category filter.
        "Retry" button shown on API error.
        Loading ActivityIndicator while fetching.

    [ ] Exercise Detail page ⚠️ NOT DONE
        Create app/(drawer)/exercise/[id].tsx (or similar dynamic route).
        Show: name, category, difficulty, description, muscle group.
        Favorite toggle button (dispatches TOGGLE_FAVORITE).

    [ ] History Tab — app/(drawer)/(tabs)/history.tsx ⚠️ NOT DONE
        Port the logic from src/screens/HomeScreen.tsx.
        List workouts with delete support.
        Empty state: "No workouts yet. Add your first one!"

✅ 6. Final Polish (The "Professional" Touch)

    [ ] Git: Create and switch to a develop branch.
        git checkout -b develop

    [ ] Loading States ⚠️ PARTIAL
        WorkoutContext already has isLoading.
        Still needed: ActivityIndicator for API calls in ExerciseContext / Exercises screen.

    [ ] Empty States ⚠️ NOT DONE
        0 workouts  → message in History tab.
        0 favorites → message in Dashboard.
        0 results   → message in Exercises catalog after search.

    [ ] README ⚠️ NOT DONE
        Update with V2 architecture diagram and API details.

---

Target Navigation Structure:

app/
├── (drawer)/                    <-- Drawer root
│   ├── _layout.tsx              <-- Drawer layout (GestureHandlerRootView)
│   ├── (tabs)/
│   │   ├── _layout.tsx          <-- Tab bar (3 tabs)
│   │   ├── index.tsx            (🏠 Dashboard)
│   │   ├── exercises.tsx        (💪 Catalog)
│   │   └── history.tsx          (📊 History — V1 logic)
│   ├── exercise/
│   │   └── [id].tsx             (Exercise Detail — dynamic route)
│   ├── add-workout.tsx          (port of AddWorkoutScreen)
│   ├── workout/[id].tsx         (port of WorkoutDetailsScreen)
│   ├── profile.tsx              (Drawer item)
│   └── settings.tsx             (Drawer item)
└── _layout.tsx                  (Root: WorkoutProvider + ExerciseProvider)