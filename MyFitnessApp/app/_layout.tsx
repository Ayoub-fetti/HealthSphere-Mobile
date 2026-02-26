import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        {/* Fitness Screens */}
        <Stack.Screen name="home" options={{ title: 'My Fitness App' }} />
        <Stack.Screen name="add-workout" options={{ title: 'Add Workout' }} />
        <Stack.Screen name="workout-details" options={{ title: 'Workout Details' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}