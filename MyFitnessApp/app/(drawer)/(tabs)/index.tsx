import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useWorkouts } from '@/src/context/WorkoutContext';

export default function DashboardScreen() {
  const { workouts } = useWorkouts();
  const router = useRouter();

  const totalMinutes = workouts.reduce((sum, w) => {
    const match = w.duration.match(/\d+/);
    return sum + (match ? parseInt(match[0]) : 0);
  }, 0);
  const totalTime =
    totalMinutes >= 60
      ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
      : `${totalMinutes}m`;

  const categories = new Set(workouts.map((w) => w.category)).size;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Athlete 👋</Text>
          <Text style={styles.subtitle}>You have {workouts.length} workouts logged</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      {/* Stats Banner */}
      <View style={styles.statsBanner}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{workouts.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalTime}</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{categories}</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(drawer)/add-workout')}
          activeOpacity={0.85}
        >
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={styles.actionLabel}>Add Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(drawer)/(tabs)/history')}
          activeOpacity={0.85}
        >
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionLabel}>View History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/(drawer)/(tabs)/exercises')}
          activeOpacity={0.85}
        >
          <Text style={styles.actionIcon}>💪</Text>
          <Text style={styles.actionLabel}>Exercises</Text>
        </TouchableOpacity>
      </View>

      {/* Favorites Placeholder */}
      <Text style={styles.sectionTitle}>Favorite Exercises</Text>
      <View style={styles.emptyFavorites}>
        <Text style={styles.emptyIcon}>⭐</Text>
        <Text style={styles.emptyText}>No favorites yet.{'\n'}Browse exercises to add some!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  content: { paddingBottom: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: '#11181C' },
  subtitle: { fontSize: 13, color: '#687076', marginTop: 2 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#0a7ea4', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  statsBanner: {
    flexDirection: 'row', backgroundColor: '#0a7ea4', borderRadius: 16,
    marginHorizontal: 16, marginVertical: 12, paddingVertical: 16,
    alignItems: 'center', justifyContent: 'space-evenly',
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 11, color: '#cce8f4', marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
  sectionTitle: {
    fontSize: 17, fontWeight: '700', color: '#11181C',
    paddingHorizontal: 20, marginBottom: 12, marginTop: 8,
  },
  actionsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
  actionCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 16,
    alignItems: 'center', gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  actionIcon: { fontSize: 28 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: '#11181C', textAlign: 'center' },
  emptyFavorites: {
    marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14,
    padding: 28, alignItems: 'center', gap: 10,
  },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 14, color: '#687076', textAlign: 'center', lineHeight: 20 },
});