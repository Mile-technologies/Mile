import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Car, CalendarCheck, Key, Clock, ArrowRight } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export const ServiceGrid = () => {
  const router = useRouter();

  const handlePress = (type: string) => {
    // Navigate to book-ride with a param, or to specific screens if they exist
    // For now, defaulting to book-ride for demonstration of functionality
    router.push({
      pathname: '/(app)/book-ride',
      params: { serviceType: type }
    });
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <Pressable style={styles.seeAllButton}>
          <ArrowRight size={20} color="#F8DFA6" />
        </Pressable>
      </View>

      <View style={styles.gridContainer}>
        <Pressable onPress={() => handlePress('ride')} style={styles.gridItem}>
          <View style={styles.iconBox}>
            <Car size={32} color="#1E293B" weight="fill" />
          </View>
          <Text style={styles.gridLabel}>Ride</Text>
        </Pressable>
        
        <Pressable onPress={() => handlePress('reserve')} style={styles.gridItem}>
          <View style={styles.iconBox}>
            <CalendarCheck size={32} color="#F8DFA6" weight="fill" />
          </View>
          <Text style={styles.gridLabel}>Reserve</Text>
        </Pressable>
        
        <Pressable onPress={() => handlePress('rental')} style={styles.gridItem}>
          <View style={styles.iconBox}>
            <Key size={32} color="#F8DFA6" weight="fill" />
          </View>
          <Text style={styles.gridLabel}>Rental</Text>
        </Pressable>
        
        <Pressable onPress={() => handlePress('hourly')} style={styles.gridItem}>
          <View style={styles.iconBox}>
            <Clock size={32} color="#F8DFA6" weight="fill" />
          </View>
          <Text style={styles.gridLabel}>Hourly</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#F8DFA6',
    fontFamily: 'Inter_700Bold',
  },
  seeAllButton: {
    padding: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  gridItem: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: '#0D1522',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  gridLabel: {
    color: '#F8DFA6',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
});
