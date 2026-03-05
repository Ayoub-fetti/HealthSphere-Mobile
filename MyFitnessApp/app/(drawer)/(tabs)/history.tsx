import React from 'react';
import {
  ActivityIndicator, FlatList, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { useRouter } from 'expo-router';
import WorkoutItem from '@/src/components/WorkoutItem';
import { useWorkouts } from '@/src/context/WorkoutContext';

export default function HistoryScreen() {
  const { workouts, deleteWorkout, isLoading, storageError } = useWorkouts();
  const router = useRouter();

  if (isLoading) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.loadingText}>Loading your workouts…</Text>
      </View>
    );
  }

  if (storageError) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{storageError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutItem
            workout={item}
            onPress={(id) => router.push(`/(drawer)/workout/${id}`)}
            onDelete={deleteWorkout}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Workout History</Text>}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No workouts yet. Add your first one!</Text>
          </View>
        }
      />

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/(drawer)/add-workout')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  centeredState: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: 12, backgroundColor: '#F4F8FB', padding: 24,
  },
  loadingText: { fontSize: 15, color: '#687076', marginTop: 8 },
  errorIcon: { fontSize: 48 },
  errorTitle: { fontSize: 18, fontWeight: '700', color: '#11181C' },
  errorMessage: { fontSize: 14, color: '#E53935', textAlign: 'center' },
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: '#11181C',
    paddingHorizontal: 20, paddingTop: 16, marginBottom: 4,
  },
  listContent: { paddingBottom: 100 },
  emptyState: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyIcon: { fontSize: 48 },
  emptyText: { fontSize: 16, color: '#687076', textAlign: 'center' },
  fab: {
    position: 'absolute', bottom: 28, right: 24,
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#0a7ea4', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#0a7ea4', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 8,
  },
  fabIcon: { fontSize: 32, color: '#fff', lineHeight: 36 },
});