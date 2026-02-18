import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, FlatList } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Car, Clock, MapPin, Users } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// Lazy load the map component to avoid SSR window issues
import React, { Suspense } from 'react';
const LeafletMap = React.lazy(() => import('./LeafletMap'));

// Mock data for demo cabs around Nairobi
const DEMO_CABS = [
  { id: 1, type: 'Standard', lat: -1.2910, lng: 36.8210, eta: '2 min', price: 250, capacity: 4 },
  { id: 2, type: 'Comfort', lat: -1.2930, lng: 36.8230, eta: '4 min', price: 350, capacity: 4 },
  { id: 3, type: 'Boda', lat: -1.2915, lng: 36.8205, eta: '1 min', price: 150, capacity: 1 },
  { id: 4, type: 'XL', lat: -1.2925, lng: 36.8225, eta: '7 min', price: 500, capacity: 6 },
];

const NAIROBI_CENTER = {
  lat: -1.2921,
  lng: 36.8219,
};

interface Place {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

export default function BookRideScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedCab, setSelectedCab] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('Current Location');
  const [dropoffLocation, setDropoffLocation] = useState('');
  
  // Search state
  const [mapCenter, setMapCenter] = useState(NAIROBI_CENTER);
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [activeField, setActiveField] = useState<'pickup' | 'dropoff' | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const searchPlaces = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=ke`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error searching places:', error);
    }
  };

  const handleTextChange = (text: string, field: 'pickup' | 'dropoff') => {
    if (field === 'pickup') setPickupLocation(text);
    else setDropoffLocation(text);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      searchPlaces(text);
    }, 500);
  };

  const handlePlaceSelect = (place: Place) => {
    if (activeField === 'pickup') {
      setPickupLocation(place.display_name);
    } else if (activeField === 'dropoff') {
      setDropoffLocation(place.display_name);
    }
    
    setMapCenter({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    setSuggestions([]);
    setActiveField(null);
  };

  const handleSelectCab = (id: number) => {
    setSelectedCab(id);
  };

  return (
    <View style={styles.container}>
      {/* Web Map Implementation */}
      <View style={styles.map}>
        {isClient ? (
          <Suspense fallback={<View style={styles.loadingMap}><Text style={{color: '#F8DFA6'}}>Loading Map...</Text></View>}>
            <LeafletMap
              center={mapCenter}
              cabs={DEMO_CABS}
              selectedCab={selectedCab}
              onSelectCab={handleSelectCab}
            />
          </Suspense>
        ) : (
          <View style={styles.loadingMap} />
        )}
      </View>

      {/* Top Search Bar Overlay */}
      <View style={[styles.searchOverlay, { top: insets.top + 10 }]}>
        <View style={styles.searchBox}>
          <View style={styles.dot} />
          <TextInput
            style={styles.input}
            value={pickupLocation}
            onChangeText={(text) => handleTextChange(text, 'pickup')}
            onFocus={() => setActiveField('pickup')}
            placeholder="Current Location"
            placeholderTextColor="#94A3B8"
            // @ts-ignore
            style={[styles.input, { outlineStyle: 'none' }]} 
          />
        </View>
        <View style={styles.connector} />
        <View style={styles.searchBox}>
          <View style={[styles.dot, styles.squareDot]} />
          <TextInput
            style={styles.input}
            value={dropoffLocation}
            onChangeText={(text) => handleTextChange(text, 'dropoff')}
            onFocus={() => setActiveField('dropoff')}
            placeholder="Where to?"
            placeholderTextColor="#94A3B8"
            // @ts-ignore
            style={[styles.input, { outlineStyle: 'none' }]}
          />
        </View>
        
        {/* Search Suggestions */}
        {suggestions.length > 0 && activeField && (
          <View style={styles.suggestionsContainer}>
            {suggestions.map((place) => (
              <Pressable
                key={place.place_id}
                style={styles.suggestionItem}
                onPress={() => handlePlaceSelect(place)}
              >
                <MapPin size={20} color="#94A3B8" weight="fill" />
                <Text style={styles.suggestionText} numberOfLines={1}>
                  {place.display_name}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* Bottom Sheet for Cab Selection */}
      <View style={[
        styles.bottomSheet, 
        { paddingBottom: insets.bottom + 20 },
        // @ts-ignore
        { boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.25)' }
      ]}>
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
                selectedCab === cab.id && styles.selectedCabCard,
                // @ts-ignore
                { cursor: 'pointer' }
              ]}
              onPress={() => handleSelectCab(cab.id)}
            >
              <View style={styles.cabIconBg}>
                <Car size={32} color="#F8DFA6" weight="fill" />
              </View>
              <View style={styles.cabInfo}>
                <View style={styles.typeContainer}>
                  <Text style={styles.cabType}>{cab.type}</Text>
                  <View style={styles.capacityContainer}>
                    <Users size={12} color="#94A3B8" weight="fill" />
                    <Text style={styles.capacityText}>{cab.capacity}</Text>
                  </View>
                </View>
                <View style={styles.etaContainer}>
                  <Clock size={12} color="#94A3B8" />
                  <Text style={styles.cabEta}>{cab.eta}</Text>
                </View>
              </View>
              <Text style={styles.cabPrice}>KES {cab.price}</Text>
            </Pressable>
          ))}
        </ScrollView>
        
        <Pressable style={[
          styles.confirmButton,
          // @ts-ignore
          { 
            cursor: 'pointer',
            outlineStyle: 'none',
            boxShadow: 'none'
          }
        ]}>
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
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
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
    pointerEvents: 'auto', // Allow interaction with search box
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  input: {
    flex: 1,
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    padding: 0,
    height: 24, // Ensure adequate height for text input
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
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#0D1522',
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#334155',
    maxHeight: 200,
    overflow: 'hidden',
    zIndex: 1001,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  suggestionText: {
    flex: 1,
    color: '#F8DFA6',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
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
    zIndex: 1000, // Ensure it sits on top of map
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
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#334155',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  capacityText: {
    color: '#94A3B8',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
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
  },
  confirmButtonText: {
    color: '#0D1522',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
});
