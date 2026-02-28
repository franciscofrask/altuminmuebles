'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para el ícono de Leaflet en Next.js (los assets se cargan mal por defecto)
const customIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 36px; height: 36px;
      background: #1A3C5E;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 14px rgba(26,60,94,0.4);
    "></div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -40],
});

export default function PropertyMap({ lat = -26.8167, lng = -65.2833, title = 'Propiedad' }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ width: '100%', height: '100%', borderRadius: 16 }}
      scrollWheelZoom={false}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[lat, lng]}
        radius={200}
        pathOptions={{ color: '#1A3C5E', fillColor: '#1A3C5E', fillOpacity: 0.08, weight: 1.5, dashArray: '6 4' }}
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          <strong style={{ fontFamily: 'sans-serif', fontSize: 13 }}>{title}</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
