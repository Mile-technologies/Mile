import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

// Types for props
interface LeafletMapProps {
  center: { lat: number; lng: number };
  cabs: Array<{ id: number; lat: number; lng: number; type: string }>;
  selectedCab: number | null;
  onSelectCab: (id: number) => void;
}

// Helper function to create icons
const createCarIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-car-icon',
    html: `
      <div style="
        background-color: ${isSelected ? '#FFFFFF' : '#F8DFA6'};
        border: 2px solid #F8DFA6;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: transform 0.2s;
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
          <path d="M240,112H226.75L208.52,57.3A16.08,16.08,0,0,0,193.33,48H62.67a16.08,16.08,0,0,0-15.19,9.3L29.25,112H16a8,8,0,0,0,0,16H27.56L18.41,178.9A24,24,0,0,0,42.19,208H213.81a24,24,0,0,0,23.78-29.1L228.44,128H240a8,8,0,0,0,0-16ZM62.67,64H193.33l13.33,40H49.34ZM213.81,192H42.19l8-44.44a4.17,4.17,0,0,0,.08-.73L43.56,128H212.44l-6.72,18.83a4.17,4.17,0,0,0,.08.73Z"></path>
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20], // Center the icon
  });
};

// Map Updater Component
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Main Map Component
export default function LeafletMap({ 
  center, 
  cabs, 
  selectedCab, 
  onSelectCab
}: LeafletMapProps) {
  
  return (
    <>
      <style>
        {`
          @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
          .leaflet-container {
            width: 100%;
            height: 100%;
            background-color: #1E293B;
          }
        `}
      </style>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {cabs.map((cab) => (
          <Marker
            key={cab.id}
            position={[cab.lat, cab.lng]}
            icon={createCarIcon(selectedCab === cab.id)}
            eventHandlers={{
              click: () => onSelectCab(cab.id),
            }}
          />
        ))}

        {selectedCab && (
          <MapUpdater 
            center={[
              cabs.find(c => c.id === selectedCab)?.lat || center.lat,
              cabs.find(c => c.id === selectedCab)?.lng || center.lng
            ]} 
          />
        )}
      </MapContainer>
    </>
  );
}
