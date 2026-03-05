import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>
      <Text style={styles.name}>Athlete</Text>
      <Text style={styles.subtitle}>HealthSphere Member</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#F4F8FB',
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#0a7ea4', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: '700' },
  name: { fontSize: 24, fontWeight: '800', color: '#11181C' },
  subtitle: { fontSize: 14, color: '#687076' },
});