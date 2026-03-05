import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚙️</Text>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App preferences coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#F4F8FB',
    alignItems: 'center', justifyContent: 'center', gap: 12,
  },
  icon: { fontSize: 52 },
  title: { fontSize: 24, fontWeight: '800', color: '#11181C' },
  subtitle: { fontSize: 14, color: '#687076' },
});