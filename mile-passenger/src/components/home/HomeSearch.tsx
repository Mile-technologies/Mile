import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MagnifyingGlass, CalendarCheck } from 'phosphor-react-native';
import { useRouter } from 'expo-router';

export const HomeSearch = () => {
  const router = useRouter();

  const handleSearchPress = () => {
    router.push('/(app)/book-ride');
  };

  const handleLaterPress = () => {
    // For now, also go to book-ride, maybe we can pass a param later
    router.push('/(app)/book-ride');
  };

  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={handleSearchPress} style={styles.searchBar}>
        <MagnifyingGlass size={24} color="#F8DFA6" weight="bold" />
        <Text style={styles.searchPlaceholder}>Enter pickup point</Text>
      </Pressable>
      <Pressable onPress={handleLaterPress} style={styles.laterButton}>
        <CalendarCheck size={20} color="#F8DFA6" weight="fill" />
        <Text style={styles.laterText}>Later</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#0D1522',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#F8DFA6',
    fontFamily: 'Inter_600SemiBold',
  },
  laterButton: {
    backgroundColor: '#0D1522',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  laterText: {
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
});
