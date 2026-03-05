import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { WorkoutProvider } from '@/src/context/WorkoutContext';
import { ExerciseProvider } from '@/src/context/ExerciseContext';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutProvider>
        <ExerciseProvider>
        <Slot />
        </ExerciseProvider>
      </WorkoutProvider>
    </GestureHandlerRootView>
  );
}