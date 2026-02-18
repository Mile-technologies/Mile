import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Car, Clock, ArrowClockwise, Info, Motorbike, Van, CalendarBlank } from 'phosphor-react-native';

// Types
type RideStatus = 'Completed' | 'Cancelled' | 'Scheduled';
type VehicleType = 'Standard' | 'Boda' | 'XL';

interface Ride {
  id: string;
  date: string;
  time: string;
  destination: string;
  price: number;
  status: RideStatus;
  vehicle: VehicleType;
}

interface RideSection {
  title: string;
  data: Ride[];
}

// Mock Data
const PAST_RIDES: RideSection[] = [
  {
    title: 'February 2026',
    data: [
      {
        id: '1',
        date: '14 Feb',
        time: '8:42',
        destination: 'Nairobi Muslim Academy, Nairobi',
        price: 180,
        status: 'Completed',
        vehicle: 'Standard',
      },
      {
        id: '2',
        date: '10 Feb',
        time: '14:30',
        destination: 'Westgate Mall, Nairobi',
        price: 450,
        status: 'Completed',
        vehicle: 'XL',
      },
    ],
  },
  {
    title: 'December 2025',
    data: [
      {
        id: '3',
        date: '17 Dec',
        time: 'Cancelled',
        destination: 'Langata Cemetery, Nairobi',
        price: 0,
        status: 'Cancelled',
        vehicle: 'Standard',
      },
      {
        id: '4',
        date: '17 Dec',
        time: 'Cancelled',
        destination: 'Langata Cemetery, Nairobi',
        price: 0,
        status: 'Cancelled',
        vehicle: 'Standard',
      },
      {
        id: '5',
        date: '05 Dec',
        time: '09:15',
        destination: 'Jomo Kenyatta Int. Airport',
        price: 1200,
        status: 'Completed',
        vehicle: 'Standard',
      },
    ],
  },
];

const UPCOMING_RIDES: RideSection[] = [
  // Intentionally empty to show the empty state design
];

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past');

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case 'Boda': return <Motorbike size={24} color="#94A3B8" weight="fill" />;
      case 'XL': return <Van size={24} color="#94A3B8" weight="fill" />;
      default: return <Car size={24} color="#94A3B8" weight="fill" />;
    }
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <View style={styles.rideItem}>
      {/* Left: Icon */}
      <View style={styles.iconContainer}>
        {getVehicleIcon(item.vehicle)}
      </View>

      {/* Middle: Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeText}>
            {item.date} • {item.status === 'Cancelled' ? 'Cancelled' : item.time}
          </Text>
        </View>
        <Text style={styles.destinationText} numberOfLines={2}>
          {item.destination}
        </Text>
        <Text style={styles.priceText}>KES {item.price}</Text>
      </View>

      {/* Right: Action */}
      <TouchableOpacity style={styles.rebookButton}>
        <ArrowClockwise size={20} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => {
    if (activeTab === 'upcoming') {
      return (
        <View style={styles.upcomingEmptyContainer}>
          <View style={styles.upcomingIconWrapper}>
            <CalendarBlank size={64} color="#F8DFA6" weight="duotone" />
            <View style={styles.clockBadge}>
              <Clock size={24} color="#0D1522" weight="fill" />
            </View>
          </View>
          <Text style={styles.upcomingEmptyTitle}>No upcoming rides</Text>
          <Text style={styles.upcomingEmptySubtitle}>
            Whatever is on your schedule, a Scheduled Ride can get you there on time
          </Text>
          <TouchableOpacity>
            <Text style={styles.learnMoreLink}>Learn how it works</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Schedule a ride</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Clock size={48} color="#334155" />
        <Text style={styles.emptyText}>No past rides found</Text>
      </View>
    );
  };

  const activeData = activeTab === 'past' ? PAST_RIDES : UPCOMING_RIDES;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Rides</Text>
        <TouchableOpacity>
          <Info size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Upcoming</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <SectionList
        sections={activeData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={[
          styles.listContent, 
          activeData.length === 0 && { flex: 1 }
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1522',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  screenTitle: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#F1F5F9',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#F8DFA6',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#F1F5F9',
    fontFamily: 'Inter_600SemiBold',
  },
  listContent: {
    paddingBottom: 20,
    minHeight: '100%',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0D1522',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#F1F5F9',
  },
  rideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateTimeText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
  },
  destinationText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#F1F5F9',
    marginBottom: 4,
    lineHeight: 22,
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#F1F5F9',
  },
  rebookButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#64748B',
  },
  
  // Upcoming Empty State Styles
  upcomingEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  upcomingIconWrapper: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  clockBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F8DFA6',
    borderRadius: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0D1522',
  },
  upcomingEmptyTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#F1F5F9',
    marginBottom: 12,
    textAlign: 'center',
  },
  upcomingEmptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  learnMoreLink: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#F8DFA6', // Using Gold as link color
    marginBottom: 40,
  },
  scheduleButton: {
    backgroundColor: '#F8DFA6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#0D1522',
  },
});
