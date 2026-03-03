import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '@/src/navigation/AppNavigator';
import { WorkoutProvider } from '@/src/context/WorkoutContext';

export default function RootLayout() {
  return (
    <WorkoutProvider>
      <AppNavigator />
    </WorkoutProvider>
  );
}