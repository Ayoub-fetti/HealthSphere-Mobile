import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  AddWorkout: undefined;
  WorkoutDetails: { workoutId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Fitness App' }} />
        <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} options={{ title: 'Add Workout' }} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} options={{ title: 'Workout Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}