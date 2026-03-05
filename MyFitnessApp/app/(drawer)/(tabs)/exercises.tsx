import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExercisesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>💪</Text>
      <Text style={styles.title}>Exercise Catalog</Text>
      <Text style={styles.subtitle}>API integration coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#F4F8FB',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  icon: { fontSize: 52, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#11181C', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#687076', textAlign: 'center' },
});