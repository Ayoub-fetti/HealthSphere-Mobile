import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type AddWorkoutScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddWorkout'>;
};

export default function AddWorkoutScreen({ navigation }: AddWorkoutScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Add Workout Screen</Text>
      <Button title="← Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: 'bold' },
});