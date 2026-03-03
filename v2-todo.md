📝 HealthSphere V2 - Project Roadmap


📂 1. Architecture Refactor

Since you are using Expo Router (app directory), we need to ensure the "Navigation Advanced" requirement is met using file-based routing.

    [ ] Install Missing Navigation:
    npx expo install @react-navigation/drawer @react-native-community/netinfo

    [ ] Setup Drawer: In app/_layout.tsx, wrap the entire application in a GestureHandlerRootView and define the Drawer layout.

    [ ] Setup Tabs: In app/(tabs)/_layout.tsx, configure the 3 required tabs:

        🏠 Dashboard (New)

        💪 Exercises (New Catalog)

        📊 History (Link this to your existing HomeScreen.tsx logic)

    [ ] Map src/ to app/: Move or reference your V1 screens (AddWorkoutScreen, WorkoutDetailsScreen) so they work within the new app/ structure.

🌐 2. API & Services (src/services/)

Goal: Fetch real data from an external source.

    [ ] Choose API: Use API Ninjas Exercises (Free) or ExerciseDB.

    [ ] Create src/services/apiService.ts:

        Implement a fetchExercises function.

        Use fetch or axios with a timeout.

    [ ] Add Error Handling: Create a standard response object that handles { data, loading, error }.

🧠 3. Global State (src/context/)

Goal: Centralize Exercise and Favorite data.

    [ ] Create ExerciseContext.tsx:

        Create a state for the exercises array.

        Create a state for favorites (IDs of exercises).

    [ ] Implement Reducer: Use useReducer to manage SET_EXERCISES, TOGGLE_FAVORITE, and FETCH_START.

    [ ] Persistence: Update src/storage/workoutStorage.ts to also save/load favorites.

📡 4. Offline-First Strategy

Goal: App must work without internet.

    [ ] NetInfo Hook: Create src/hooks/useNetwork.ts to listen to connection changes.

    [ ] Sync Logic:

        If Online: Fetch API -> Update Context -> Save to AsyncStorage.

        If Offline: Load from AsyncStorage -> Update Context.

    [ ] UI Feedback: Add a small "Offline Mode" indicator in the app/(tabs)/_layout.tsx header.

📱 5. New Screens Development

    [ ] Dashboard (app/(tabs)/index.tsx):

        Show "Total Workouts" (from V1 data).

        Show "Favorite Exercises" count.

    [ ] Exercises Catalog (app/(tabs)/exercises.tsx):

        Implement FlatList with search/filter.

        Add "Retry" button for API errors.

    [ ] Exercise Detail: Create a page to show the category, difficulty, and description.

✅ 6. Final Polish (The "Professional" Touch)

    [ ] Git: Ensure you are working on a develop branch.

    [ ] Loading States: Add an ActivityIndicator for API calls.

    [ ] Empty States: Display a message when the user has 0 workouts or 0 favorites.

    [ ] README: Update with your V2 Architecture diagram and API details.

Suggested Navigation Structure: 

app/
├── (drawer)/           <-- Main Entry (Drawer)
│   ├── (tabs)/         <-- Bottom Tabs inside Drawer
│   │   ├── index.tsx   (Dashboard)
│   │   ├── exercises   (API Catalog)
│   │   └── history     (V1 Home)
│   ├── profile.tsx     (Drawer Item)
│   └── settings.tsx    (Drawer Item)
└── _layout.tsx         (Root Provider / Drawer Setup)