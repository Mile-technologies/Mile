import { View, Text, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { Car, MapPin, NavigationArrow, Clock } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const NAIROBI_REGION = {
  latitude: -1.2921,
  longitude: 36.8219,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Mock data for demo cabs around Nairobi
const DEMO_CABS = [
  { id: 1, type: 'Standard', lat: -1.2910, lng: 36.8210, eta: '2 min', price: 250 },
  { id: 2, type: 'Comfort', lat: -1.2930, lng: 36.8230, eta: '4 min', price: 350 },
  { id: 3, type: 'Boda', lat: -1.2915, lng: 36.8205, eta: '1 min', price: 150 },
  { id: 4, type: 'XL', lat: -1.2925, lng: 36.8225, eta: '7 min', price: 500 },
];

export default function BookRideScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCab, setSelectedCab] = useState<number | null>(null);

  const handleSelectCab = (id: number) => {
    setSelectedCab(id);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={NAIROBI_REGION}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {DEMO_CABS.map((cab) => (
          <Marker
            key={cab.id}
            coordinate={{ latitude: cab.lat, longitude: cab.lng }}
            onPress={() => handleSelectCab(cab.id)}
          >
            <View style={[
              styles.markerContainer,
              selectedCab === cab.id && styles.selectedMarker
            ]}>
              <Car 
                size={20} 
                color="#000000" // Black car icon
                weight="fill" 
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Top Search Bar Overlay */}
      <View style={[styles.searchOverlay, { top: insets.top + 10 }]}>
        <View style={styles.searchBox}>
          <View style={styles.dot} />
          <Text style={styles.searchText}>Current Location</Text>
        </View>
        <View style={styles.connector} />
        <View style={styles.searchBox}>
          <View style={[styles.dot, styles.squareDot]} />
          <Text style={styles.searchTextPlaceholder}>Where to?</Text>
        </View>
      </View>

      {/* Bottom Sheet for Cab Selection */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.sheetTitle}>Choose a ride</Text>
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.cabList}
        >
          {DEMO_CABS.map((cab) => (
            <Pressable
              key={cab.id}
              style={[
                styles.cabCard,
                selectedCab === cab.id && styles.selectedCabCard
              ]}
              onPress={() => handleSelectCab(cab.id)}
            >
              <View style={styles.cabIconBg}>
                <Car size={32} color="#F8DFA6" weight="fill" />
              </View>
              <View style={styles.cabInfo}>
                <Text style={styles.cabType}>{cab.type}</Text>
                <View style={styles.etaContainer}>
                  <Clock size={12} color="#94A3B8" />
                  <Text style={styles.cabEta}>{cab.eta}</Text>
                </View>
              </View>
              <Text style={styles.cabPrice}>KES {cab.price}</Text>
            </Pressable>
          ))}
        </ScrollView>
        
        <Pressable style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Confirm Pickup</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1522',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: '#F8DFA6', // Gold background
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F8DFA6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMarker: {
    backgroundColor: '#FFFFFF', // White background when selected for contrast
    borderColor: '#F8DFA6',
    transform: [{ scale: 1.2 }], // Make it slightly bigger when selected
  },
  searchOverlay: {
    position: 'absolute',
    left: 20,
    right: 20,
    backgroundColor: '#0D1522',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F8DFA6',
    gap: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  searchText: {
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  searchTextPlaceholder: {
    color: '#94A3B8',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F8DFA6',
  },
  squareDot: {
    borderRadius: 0,
    backgroundColor: '#94A3B8',
  },
  connector: {
    width: 2,
    height: 16,
    backgroundColor: '#334155',
    marginLeft: 3,
    marginVertical: -4,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%', // Occupy half screen
    backgroundColor: '#0D1522',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderTopWidth: 0, // Removed border
    elevation: 10, // Keep shadow for depth but no border line
  },
  sheetTitle: {
    color: '#F8DFA6',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  cabList: {
    gap: 12,
    paddingBottom: 20,
  },
  cabCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  selectedCabCard: {
    borderColor: '#F8DFA6',
    backgroundColor: 'rgba(248, 223, 166, 0.1)',
  },
  cabIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0D1522',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabInfo: {
    flex: 1,
    gap: 2,
  },
  cabType: {
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cabEta: {
    color: '#94A3B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  cabPrice: {
    color: '#F8DFA6',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  confirmButton: {
    backgroundColor: '#F8DFA6',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  confirmButtonText: {
    color: '#0D1522',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});
