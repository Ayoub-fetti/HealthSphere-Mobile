import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { WorkoutProvider } from '@/src/context/WorkoutContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutProvider>
        <Slot />
      </WorkoutProvider>
    </GestureHandlerRootView>
  );
}