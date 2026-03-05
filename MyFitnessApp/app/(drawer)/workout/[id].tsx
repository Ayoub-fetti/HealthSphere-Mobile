import React from 'react';
import {
  Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useWorkouts } from '@/src/context/WorkoutContext';

const INTENSITY_CONFIG: Record<string, { color: string; bg: string; icon: string }> = {
  Easy:     { color: '#2E7D32', bg: '#E8F5E9', icon: '🟢' },
  Moderate: { color: '#F57F17', bg: '#FFF8E1', icon: '🟡' },
  Hard:     { color: '#E65100', bg: '#FFF3E0', icon: '🟠' },
  Max:      { color: '#B71C1C', bg: '#FFEBEE', icon: '🔴' },
};
const DEFAULT_INTENSITY = { color: '#0a7ea4', bg: '#E6F4FE', icon: '⚪' };

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoIcon}>{icon}</Text>
      <View style={styles.infoTextBlock}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { workouts, deleteWorkout } = useWorkouts();
  const router = useRouter();

  const workout = workouts.find((w) => w.id === id);

  if (!workout) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundIcon}>🔍</Text>
        <Text style={styles.notFoundTitle}>Workout not found</Text>
        <Text style={styles.notFoundSub}>It may have been deleted.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      '🗑️ Delete Workout',
      `Are you sure you want to delete "${workout.title}"?\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: async () => {
            await deleteWorkout(workout.id);
            router.replace('/(drawer)/(tabs)/history');
          },
        },
      ],
      { cancelable: true },
    );
  };

  const intensityCfg = INTENSITY_CONFIG[workout.intensity ?? ''] ?? DEFAULT_INTENSITY;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>

      <View style={styles.heroCard}>
        <View style={styles.heroIconWrapper}>
          <Text style={styles.heroIcon}>🏋️</Text>
        </View>
        <Text style={styles.heroTitle}>{workout.title}</Text>
        <Text style={styles.heroCategory}>{workout.category}</Text>
        {workout.intensity && (
          <View style={[styles.intensityBadge, { backgroundColor: intensityCfg.bg }]}>
            <Text style={styles.intensityBadgeText}>
              {intensityCfg.icon}{' '}
              <Text style={[styles.intensityBadgeLabel, { color: intensityCfg.color }]}>
                {workout.intensity} Intensity
              </Text>
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout Details</Text>
        <View style={styles.card}>
          <InfoRow icon="📅" label="Date" value={workout.date} />
          <View style={styles.divider} />
          <InfoRow icon="⏱" label="Duration" value={workout.duration} />
          <View style={styles.divider} />
          <InfoRow icon="🏷️" label="Category" value={workout.category} />
          {workout.intensity && (
            <>
              <View style={styles.divider} />
              <InfoRow icon={intensityCfg.icon} label="Intensity" value={workout.intensity} />
            </>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.card}>
          <Text style={styles.notesText}>
            {workout.notes?.trim() ? workout.notes : 'No notes added for this workout.'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} activeOpacity={0.85}>
          <Text style={styles.deleteButtonText}>🗑️ Delete Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  scrollContent: { padding: 16, paddingBottom: 48 },
  notFound: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: 12, padding: 32, backgroundColor: '#F4F8FB',
  },
  notFoundIcon: { fontSize: 52 },
  notFoundTitle: { fontSize: 20, fontWeight: '700', color: '#11181C' },
  notFoundSub: { fontSize: 14, color: '#687076' },
  backBtn: {
    marginTop: 8, backgroundColor: '#0a7ea4',
    borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12,
  },
  backBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  heroCard: {
    backgroundColor: '#0a7ea4', borderRadius: 20, padding: 24,
    alignItems: 'center', marginBottom: 20,
    shadowColor: '#0a7ea4', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6,
  },
  heroIconWrapper: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  heroIcon: { fontSize: 36 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center' },
  heroCategory: { fontSize: 14, color: '#cce8f4', marginTop: 4, marginBottom: 12 },
  intensityBadge: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginTop: 4 },
  intensityBadgeText: { fontSize: 13, fontWeight: '600' },
  intensityBadgeLabel: { fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 15, fontWeight: '700', color: '#11181C',
    marginBottom: 8, paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
  },
  divider: { height: 1, backgroundColor: '#F0F4F8', marginVertical: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcon: { fontSize: 22, width: 28, textAlign: 'center' },
  infoTextBlock: { flex: 1 },
  infoLabel: {
    fontSize: 11, color: '#687076', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  infoValue: { fontSize: 15, fontWeight: '700', color: '#11181C', marginTop: 2 },
  notesText: { fontSize: 15, color: '#444', lineHeight: 22 },
  actions: { marginTop: 8, gap: 12 },
  deleteButton: {
    backgroundColor: '#FFEBEE', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#EF9A9A',
  },
  deleteButtonText: { color: '#C62828', fontSize: 16, fontWeight: '700' },
  backButton: {
    backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#E0E8EF',
  },
  backButtonText: { color: '#687076', fontSize: 15, fontWeight: '600' },
});