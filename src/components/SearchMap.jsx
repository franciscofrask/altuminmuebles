'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Componente interno: vuela al nuevo centro cuando cambia la búsqueda
function FlyToCity({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], center.zoom ?? 12, { duration: 1.2 });
    }
  }, [center.lat, center.lng, center.zoom]);
  return null;
}

function priceIcon(price, isActive) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${isActive ? '#C8923A' : '#1A3C5E'};
      color:white;
      padding:5px 11px;
      border-radius:20px;
      font-size:12px;
      font-weight:700;
      white-space:nowrap;
      box-shadow:0 3px 10px rgba(0,0,0,0.28);
      cursor:pointer;
      font-family:'DM Sans',sans-serif;
      border:2px solid white;
      transform:${isActive ? 'scale(1.1)' : 'scale(1)'};
      transition:all 0.18s;
    ">USD ${(price / 1000).toFixed(0)}k</div>`,
    iconSize: [82, 30],
    iconAnchor: [41, 15],
    popupAnchor: [0, -20],
  });
}

export default function SearchMap({ properties = [], activeId = null, onMarkerClick, center }) {
  const defaultCenter = center
    ? [center.lat, center.lng]
    : properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : [-38.4161, -63.6167];
  const defaultZoom = center?.zoom ?? (properties.length > 0 ? 13 : 5);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ width: '100%', height: '100%' }}
      scrollWheelZoom
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <FlyToCity center={center} />}
      {properties.map((prop) => (
        <Marker
          key={prop.id}
          position={[prop.lat, prop.lng]}
          icon={priceIcon(prop.price, activeId === prop.id)}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(prop.id),
          }}
        >
        <Popup>
            <div style={{ fontFamily: "'DM Sans', sans-serif", minWidth: 180 }}>
              <div style={{
                width: '100%',
                height: 90,
                backgroundImage: `url('${prop.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 6,
                marginBottom: 8,
              }} />
              <strong style={{ fontSize: 13, display: 'block', marginBottom: 2, color: '#0f172a' }}>
                {prop.title}
              </strong>
              <span style={{ color: '#6b7280', fontSize: 11 }}>{prop.location}</span>
              <div style={{ marginTop: 6, marginBottom: 10, fontWeight: 800, fontSize: 15, color: '#1A3C5E' }}>
                {prop.priceLabel}
              </div>
              <a
                href={`/property/${prop.id}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#1A3C5E',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 12,
                  padding: '7px 0',
                  borderRadius: 8,
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                Ver detalle →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
