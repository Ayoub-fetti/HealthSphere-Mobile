import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWorkouts } from '../context/WorkoutContext';

type AddWorkoutScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddWorkout'>;
};

type FormFields = {
  title: string;
  type: string;
  duration: string;
  intensity: string;
  date: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

const WORKOUT_TYPES = ['Strength', 'Cardio', 'HIIT', 'Flexibility', 'Sports', 'Other'];
const INTENSITIES = ['Easy', 'Moderate', 'Hard', 'Max'];

const CATEGORY_EMOJI: Record<string, string> = {
  Strength: '💪 Strength',
  Cardio: '🏃 Cardio',
  HIIT: '🔥 HIIT',
  Flexibility: '🧘 Flexibility',
  Sports: '⚽ Sports',
  Other: '🏅 Other',
};

export default function AddWorkoutScreen({ navigation }: AddWorkoutScreenProps) {
  // ✅ Use context
  const { addWorkout } = useWorkouts();

  const [form, setForm] = useState<FormFields>({
    title: '',
    type: WORKOUT_TYPES[0],
    duration: '',
    intensity: INTENSITIES[1],
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const updateField = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ─── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim()) newErrors.title = 'Workout name is required.';

    if (!form.duration.trim()) {
      newErrors.duration = 'Duration is required.';
    } else if (isNaN(Number(form.duration)) || Number(form.duration) <= 0) {
      newErrors.duration = 'Duration must be a positive number.';
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!form.date.trim()) {
      newErrors.date = 'Date is required.';
    } else if (!dateRegex.test(form.date)) {
      newErrors.date = 'Date must be in YYYY-MM-DD format.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ──────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!validate()) return;

    // ✅ Build a Workout object and add it via context
    const newWorkout = {
      id: Date.now().toString(),
      title: form.title.trim(),
      duration: `${form.duration} min`,
      category: CATEGORY_EMOJI[form.type] ?? form.type,
      date: form.date,
    };

    addWorkout(newWorkout);

    Alert.alert(
      '✅ Workout Added!',
      `"${form.title}" has been saved successfully.`,
      [{ text: 'View Home', onPress: () => navigation.navigate('Home') }]
    );
  };

  // ─── UI ──────────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>New Workout 🏋️</Text>
          <Text style={styles.headerSubtitle}>Fill in the details below</Text>
        </View>

        {/* ── Workout Name ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Workout Name *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            placeholder="e.g. Morning Full Body"
            placeholderTextColor="#aaa"
            value={form.title}
            onChangeText={(v) => updateField('title', v)}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* ── Type (Picker) ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Workout Type *</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.type}
              onValueChange={(v) => updateField('type', v)}
              style={styles.picker}
              dropdownIconColor="#0a7ea4"
            >
              {WORKOUT_TYPES.map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
            </Picker>
          </View>
        </View>

        {/* ── Duration ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Duration (minutes) *</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.inputFlex, errors.duration && styles.inputError]}
              placeholder="e.g. 45"
              placeholderTextColor="#aaa"
              value={form.duration}
              onChangeText={(v) => updateField('duration', v)}
              keyboardType="numeric"
            />
            <View style={styles.unitBadge}>
              <Text style={styles.unitText}>min</Text>
            </View>
          </View>
          {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}
        </View>

        {/* ── Intensity ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Intensity *</Text>
          <View style={styles.intensityRow}>
            {INTENSITIES.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityBtn,
                  form.intensity === level && styles.intensityBtnActive,
                ]}
                onPress={() => updateField('intensity', level)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.intensityText,
                    form.intensity === level && styles.intensityTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Date ── */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Date (YYYY-MM-DD) *</Text>
          <TextInput
            style={[styles.input, errors.date && styles.inputError]}
            placeholder="e.g. 2025-01-30"
            placeholderTextColor="#aaa"
            value={form.date}
            onChangeText={(v) => updateField('date', v)}
            keyboardType="numbers-and-punctuation"
          />
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>

        {/* ── Buttons ── */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitText}>Save Workout ✓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ...existing code... (styles unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8FB' },
  scrollContent: { padding: 20, paddingBottom: 48 },
  header: { marginBottom: 24 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#11181C' },
  headerSubtitle: { fontSize: 14, color: '#687076', marginTop: 4 },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#11181C', marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E8EF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#11181C',
  },
  inputError: { borderColor: '#E53935' },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputFlex: { flex: 1 },
  unitBadge: {
    backgroundColor: '#0a7ea4',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  unitText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E0E8EF',
    overflow: 'hidden',
  },
  picker: { color: '#11181C' },
  intensityRow: { flexDirection: 'row', gap: 8 },
  intensityBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E8EF',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  intensityBtnActive: { backgroundColor: '#0a7ea4', borderColor: '#0a7ea4' },
  intensityText: { fontSize: 13, fontWeight: '600', color: '#687076' },
  intensityTextActive: { color: '#fff' },
  errorText: { color: '#E53935', fontSize: 12, marginTop: 4 },
  submitBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#0a7ea4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  cancelBtn: { marginTop: 12, alignItems: 'center', paddingVertical: 12 },
  cancelText: { color: '#687076', fontSize: 15, fontWeight: '600' },
});