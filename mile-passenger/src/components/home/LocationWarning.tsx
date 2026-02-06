import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MapPin, ArrowRight } from 'phosphor-react-native';
import { useLocation } from '../../hooks/uselocation';

export const LocationWarning = () => {
  const { permissionGranted, requestPermission, loading } = useLocation();

  if (loading || permissionGranted) {
    return null;
  }

  return (
    <Pressable onPress={requestPermission} style={styles.warningBanner}>
      <MapPin size={20} color="#1E293B" weight="fill" />
      <Text style={styles.warningText}>Location sharing disabled. Tap to enable</Text>
      <ArrowRight size={16} color="#1E293B" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  warningBanner: {
    backgroundColor: '#F8DFA6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  warningText: {
    flex: 1,
    color: '#1E293B',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});
