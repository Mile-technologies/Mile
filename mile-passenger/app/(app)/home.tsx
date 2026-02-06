import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationWarning } from '../../src/components/home/LocationWarning';
import { HomeSearch } from '../../src/components/home/HomeSearch';
import { WelcomeCard } from '../../src/components/home/WelcomeCard';
import { ServiceGrid } from '../../src/components/home/ServiceGrid';
import { PromoBanner } from '../../src/components/home/PromoBanner';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Location Warning Banner */}
        <LocationWarning />

        {/* Header */}
        <Text style={styles.headerTitle}>Mile</Text>

        {/* Search Bar */}
        <HomeSearch />

        {/* Welcome Card */}
        <WelcomeCard name="Aashard" />

        {/* Suggestions Grid */}
        <ServiceGrid />

        {/* Bottom Banner */}
        <PromoBanner />

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
  headerTitle: {
    fontSize: 36,
    color: '#F8DFA6',
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontFamily: 'Inter_700Bold',
  },
});
