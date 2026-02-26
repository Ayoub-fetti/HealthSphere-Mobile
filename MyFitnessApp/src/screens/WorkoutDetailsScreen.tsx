import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type WorkoutDetailsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'WorkoutDetails'>;
  route: RouteProp<RootStackParamList, 'WorkoutDetails'>;
};

export default function WorkoutDetailsScreen({ navigation, route }: WorkoutDetailsScreenProps) {
  const { workoutId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Workout Details Screen</Text>
      <Text>Workout ID: {workoutId}</Text>
      <Button title="← Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
});