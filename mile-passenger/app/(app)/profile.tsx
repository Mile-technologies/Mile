import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Star, 
  MapPin, 
  CreditCard, 
  Tag, 
  ShieldCheck, 
  Gear, 
  SignOut, 
  CaretRight, 
  Clock, 
  Lifebuoy, 
  Heart 
} from 'phosphor-react-native';

const PROFILE_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: 'saved-places', icon: MapPin, label: 'Saved Places', route: '/saved-places' },
      { id: 'family', icon: Heart, label: 'Family Profile', route: '/family' },
    ],
  },
  {
    title: 'Rides & Activity',
    items: [
      { id: 'trips', icon: Clock, label: 'Your Trips', route: '/trips' },
      { id: 'payment', icon: CreditCard, label: 'Payment Methods', route: '/payment' },
      { id: 'promos', icon: Tag, label: 'Promotions', route: '/promos' },
    ],
  },
  {
    title: 'Support & Settings',
    items: [
      { id: 'safety', icon: ShieldCheck, label: 'Safety Checkup', route: '/safety' },
      { id: 'help', icon: Lifebuoy, label: 'Help Center', route: '/help' },
      { id: 'settings', icon: Gear, label: 'Settings', route: '/settings' },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear auth state here
    router.replace('/(auth)/login');
  };

  const renderSection = (section: typeof PROFILE_SECTIONS[0]) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map((item, index) => (
          <TouchableOpacity 
            key={item.id} 
            style={[
              styles.menuItem, 
              index === section.items.length - 1 && styles.menuItemLast
            ]}
            onPress={() => {
              if (item.route === '/trips') {
                router.push('/(app)/trips');
              } else {
                // Navigate to other routes or show coming soon
                console.log(`Navigate to ${item.route}`);
              }
            }}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.iconContainer}>
                <item.icon size={20} color="#F8DFA6" weight="fill" />
              </View>
              <Text style={styles.menuItemLabel}>{item.label}</Text>
            </View>
            <CaretRight size={16} color="#64748B" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <User size={32} color="#0D1522" weight="fill" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>John Doe</Text>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#F8DFA6" weight="fill" />
                <Text style={styles.ratingText}>4.9</Text>
                <Text style={styles.ratingCount}>(124 rides)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>124</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuContainer}>
          {PROFILE_SECTIONS.map(renderSection)}
          
          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <SignOut size={20} color="#EF4444" weight="bold" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1522',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#F8DFA6',
    marginBottom: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8DFA6',
  },
  ratingCount: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F8DFA6',
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8DFA6',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#F1F5F9',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    padding: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#64748B',
    marginTop: 8,
  },
});
