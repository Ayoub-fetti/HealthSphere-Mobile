import React from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import WorkoutItem from '../components/WorkoutItem';
import { MOCK_WORKOUTS } from '../constants/mockWorkouts';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8FB" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Athlete 👋</Text>
          <Text style={styles.subtitle}>You have {MOCK_WORKOUTS.length} workouts logged</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>

      {/* Stats Banner */}
      <View style={styles.statsBanner}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>6</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>3h 50m</Text>
          <Text style={styles.statLabel}>Total Time</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
      </View>

      {/* List */}
      <Text style={styles.sectionTitle}>Recent Workouts</Text>
      <FlatList
        data={MOCK_WORKOUTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          <WorkoutItem
            workout={item}
            onPress={(id) => navigation.navigate('WorkoutDetails', { workoutId: id })}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddWorkout')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: '#11181C' },
  subtitle: { fontSize: 13, color: '#687076', marginTop: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: '#0a7ea4',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 11, color: '#cce8f4', marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.3)' },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#11181C',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  listContent: { paddingBottom: 100 },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a7ea4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  fabIcon: { fontSize: 32, color: '#fff', lineHeight: 36 },
});