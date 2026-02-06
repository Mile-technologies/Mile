import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MagnifyingGlass, 
  Clock, 
  Car, 
  CalendarCheck, 
  Key, 
  ArrowRight,
  MapPin
} from 'phosphor-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Location Warning Banner */}
        <View style={styles.warningBanner}>
          <MapPin size={20} color="#1E293B" weight="fill" />
          <Text style={styles.warningText}>Location sharing disabled. Tap to enable</Text>
          <ArrowRight size={16} color="#1E293B" />
        </View>

        {/* Header */}
        <Text style={styles.headerTitle}>Mile</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MagnifyingGlass size={24} color="#1E293B" weight="bold" />
            <Text style={styles.searchPlaceholder}>Enter pickup point</Text>
          </View>
          <Pressable style={styles.laterButton}>
            <Clock size={20} color="#1E293B" weight="fill" />
            <Text style={styles.laterText}>Later</Text>
          </Pressable>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Welcome Aashard</Text>
            <Text style={styles.welcomeText}>
              Take your first ride. Rides are usually between US$ 16-US$ 40 in San Francisco Bay Area.
            </Text>
            <View style={styles.welcomeActions}>
              <Pressable style={styles.pillButton}>
                <Text style={styles.pillText}>FAQs</Text>
              </Pressable>
              <Pressable style={styles.pillButton}>
                <Text style={styles.pillText}>Safety features</Text>
              </Pressable>
            </View>
          </View>
          {/* Illustration placeholder - could use an icon or leave empty for now */}
        </View>

        {/* Suggestions Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          <Pressable style={styles.seeAllButton}>
            <ArrowRight size={20} color="#F8DFA6" />
          </Pressable>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={styles.iconBox}>
              <Car size={32} color="#1E293B" weight="fill" />
            </View>
            <Text style={styles.gridLabel}>Ride</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.iconBox}>
              <CalendarCheck size={32} color="#1E293B" weight="fill" />
            </View>
            <Text style={styles.gridLabel}>Reserve</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.iconBox}>
              <Key size={32} color="#1E293B" weight="fill" />
            </View>
            <Text style={styles.gridLabel}>Rental</Text>
          </View>
          
          <View style={styles.gridItem}>
            <View style={styles.iconBox}>
              <Clock size={32} color="#1E293B" weight="fill" />
            </View>
            <Text style={styles.gridLabel}>Hourly</Text>
          </View>
        </View>

        {/* Bottom Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>Securing your safety</Text>
          <View style={styles.promoCircle} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  scrollContent: {
    paddingBottom: 100,
  },
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
  headerTitle: {
    fontSize: 36,
    color: '#F8DFA6',
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Inter_700Bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#E2E8F0', // Light background for contrast as per design
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 25,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter_600SemiBold',
  },
  laterButton: {
    backgroundColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 25,
    gap: 8,
  },
  laterText: {
    color: '#1E293B',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  welcomeCard: {
    backgroundColor: '#F8DFA6', // Using accent color for card background? Or white? 
    // The design has white card. Let's try white/light slate for the card to stand out on dark bg.
    // Or stick to theme: Dark card with light border?
    // User said "text and background color lets use the ones weve used". 
    // If bg is 1E293B, card needs to be lighter or darker.
    // Let's use white for the card (like Uber) but with our font colors?
    // No, "background color of this page to have the color (1E293B)".
    // So the card should probably be white/light to match the "Uber modern sign up page" vibe request earlier?
    // But this is a dark theme app now. 
    // Let's make the card white (or very light slate) and text dark for high contrast like the screenshot.
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  welcomeContent: {
    gap: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    color: '#1E293B',
    fontFamily: 'Inter_700Bold',
  },
  welcomeText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  welcomeActions: {
    flexDirection: 'row',
    gap: 12,
  },
  pillButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pillText: {
    color: '#1E293B',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
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
    backgroundColor: '#E2E8F0', // Light bg for icons
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
  promoBanner: {
    backgroundColor: '#2563EB', // Blue accent for banner
    marginHorizontal: 20,
    borderRadius: 16,
    height: 120,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    maxWidth: '60%',
    fontFamily: 'Inter_700Bold',
  },
  promoCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
});
