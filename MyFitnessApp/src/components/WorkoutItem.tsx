import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Workout = {
  id: string;
  title: string;
  duration: string;
  category: string;
  date: string;
};

type WorkoutItemProps = {
  workout: Workout;
  onPress: (id: string) => void;
};

export default function WorkoutItem({ workout, onPress }: WorkoutItemProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(workout.id)} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🏋️</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{workout.title}</Text>
        <Text style={styles.meta}>📅 {workout.date}</Text>
        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>⏱ {workout.duration}</Text>
          </View>
          <View style={[styles.tag, styles.tagCategory]}>
            <Text style={styles.tagText}>{workout.category}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E6F4FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: { fontSize: 26 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#11181C', marginBottom: 4 },
  meta: { fontSize: 12, color: '#687076', marginBottom: 6 },
  tags: { flexDirection: 'row', gap: 8 },
  tag: {
    backgroundColor: '#E6F4FE',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagCategory: { backgroundColor: '#FFF3E0' },
  tagText: { fontSize: 12, color: '#0a7ea4', fontWeight: '600' },
});