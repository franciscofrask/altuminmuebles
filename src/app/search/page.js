'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Group,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  Badge,
  ActionIcon,
  Select,
  SegmentedControl,
  Divider,
} from '@mantine/core';

const SearchMap = dynamic(() => import('@/components/SearchMap'), {
  ssr: false,
  loading: () => (
    <Box
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#e8edf2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#94a3b8' }}>map</span>
      <Text c="dimmed" size="sm">Cargando mapa…</Text>
    </Box>
  ),
});

import { PROPERTIES } from '@/data/properties';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

// Coordenadas de las ciudades/zonas más buscadas de Argentina
const CITY_COORDS = {
  // CABA y GBA
  'buenos aires':    { lat: -34.6037, lng: -58.3816, zoom: 12 },
  'caba':            { lat: -34.6037, lng: -58.3816, zoom: 13 },
  'palermo':         { lat: -34.5875, lng: -58.4311, zoom: 14 },
  'recoleta':        { lat: -34.5877, lng: -58.3959, zoom: 14 },
  'belgrano':        { lat: -34.5593, lng: -58.4597, zoom: 14 },
  'san isidro':      { lat: -34.4712, lng: -58.5252, zoom: 13 },
  'tigre':           { lat: -34.4260, lng: -58.5796, zoom: 13 },
  'nordelta':        { lat: -34.3758, lng: -58.6298, zoom: 13 },
  'pilar':           { lat: -34.4591, lng: -58.9128, zoom: 13 },
  'la plata':        { lat: -34.9205, lng: -57.9536, zoom: 13 },
  'canning':         { lat: -34.8603, lng: -58.5031, zoom: 14 },
  // Córdoba
  'cordoba':         { lat: -31.4135, lng: -64.1811, zoom: 12 },
  'córdoba':         { lat: -31.4135, lng: -64.1811, zoom: 12 },
  'villa allende':   { lat: -31.2961, lng: -64.2994, zoom: 13 },
  'cosquin':         { lat: -31.2422, lng: -64.4671, zoom: 13 },
  // Mendoza
  'mendoza':         { lat: -32.8908, lng: -68.8272, zoom: 12 },
  'lujan de cuyo':   { lat: -33.0667, lng: -68.8833, zoom: 13 },
  'luján de cuyo':   { lat: -33.0667, lng: -68.8833, zoom: 13 },
  'chacras de coria':{ lat: -33.0133, lng: -68.8722, zoom: 14 },
  // Rosario
  'rosario':         { lat: -32.9468, lng: -60.6393, zoom: 12 },
  // Tucumán
  'tucuman':         { lat: -26.8167, lng: -65.2167, zoom: 12 },
  'tucumán':         { lat: -26.8167, lng: -65.2167, zoom: 12 },
  'yerba buena':     { lat: -26.8167, lng: -65.2833, zoom: 13 },
  'san miguel':      { lat: -26.8241, lng: -65.2226, zoom: 13 },
  // Salta
  'salta':           { lat: -24.7859, lng: -65.4117, zoom: 12 },
  'san lorenzo':     { lat: -24.7167, lng: -65.4833, zoom: 13 },
  // Patagonia
  'bariloche':       { lat: -41.1335, lng: -71.3103, zoom: 12 },
  'san martin de los andes': { lat: -40.1572, lng: -71.3528, zoom: 13 },
  'san martín de los andes': { lat: -40.1572, lng: -71.3528, zoom: 13 },
};

const DEFAULT_CENTER = { lat: -38.4161, lng: -63.6167, zoom: 5 };

function getCityCoords(city) {
  if (!city) return DEFAULT_CENTER;
  const key = city.toLowerCase().trim();
  // buscar coincidencia parcial
  const match = Object.entries(CITY_COORDS).find(([k]) => k.includes(key) || key.includes(k));
  return match ? match[1] : DEFAULT_CENTER;
}

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Más relevantes' },
  { value: 'price_asc', label: 'Menor precio' },
  { value: 'price_desc', label: 'Mayor precio' },
  { value: 'area_desc', label: 'Mayor superficie' },
];

function PropertyCard({ property, isActive, onHover }) {
  const [favd, setFavd] = useState(false);

  return (
    <Paper
      component={Link}
      href={`/property/${property.id}`}
      radius="xl"
      style={{
        display: 'block',
        overflow: 'hidden',
        textDecoration: 'none',
        border: `2px solid ${isActive ? SECONDARY : '#f3f4f6'}`,
        boxShadow: isActive ? `0 0 0 3px ${SECONDARY}30` : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'all 0.2s',
        cursor: 'pointer',
        flexShrink: 0,
      }}
      onMouseEnter={() => onHover(property.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Image */}
      <Box style={{ position: 'relative' }}>
        <Box
          style={{
            height: 200,
            backgroundImage: `url('${property.img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Badges */}
        <Group style={{ position: 'absolute', top: 12, left: 12 }} gap={6}>
          <Badge
            size="sm"
            style={{ backgroundColor: property.operation === 'Venta' ? PRIMARY : SECONDARY, color: 'white' }}
            radius="sm"
          >
            {property.operation}
          </Badge>
          {property.featured && (
            <Badge size="sm" style={{ backgroundColor: '#f59e0b', color: 'white' }} radius="sm">
              Destacado
            </Badge>
          )}
        </Group>
        {/* Fav */}
        <ActionIcon
          size="md"
          radius="xl"
          variant="white"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}
          onClick={(e) => {
            e.preventDefault();
            setFavd((v) => !v);
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 18,
              color: favd ? '#ef4444' : '#6b7280',
              fontVariationSettings: favd ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            favorite
          </span>
        </ActionIcon>
      </Box>

      {/* Body */}
      <Box p="md">
        <Group justify="space-between" align="flex-start" mb={6}>
          <Text fw={700} c="dark" size="sm" style={{ lineHeight: 1.3, flex: 1, paddingRight: 8 }}>
            {property.title}
          </Text>
        </Group>

        <Group gap={4} mb={10}>
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#9ca3af' }}>location_on</span>
            <Text size="xs" c="dimmed">{property.location}</Text>
          <Badge size="xs" variant="light" color="gray" radius="sm" ml={4}>{property.type}</Badge>
        </Group>

        {/* Stats */}
        <Group gap={14} mb={12}>
          {property.bedrooms > 0 && (
            <Group gap={4}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>bed</span>
              <Text size="xs" c="dimmed">{property.bedrooms}</Text>
            </Group>
          )}
          {property.bathrooms > 0 && (
            <Group gap={4}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>bathtub</span>
              <Text size="xs" c="dimmed">{property.bathrooms}</Text>
            </Group>
          )}
          <Group gap={4}>
            <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>square_foot</span>
            <Text size="xs" c="dimmed">{property.area} m²</Text>
          </Group>
          {property.parking > 0 && (
            <Group gap={4}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>directions_car</span>
              <Text size="xs" c="dimmed">{property.parking}</Text>
            </Group>
          )}
        </Group>

        <Divider mb={12} />

        <Group justify="space-between" align="center">
          <Box>
            <Text style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
              {property.priceLabel}
            </Text>
            {property.bedrooms > 0 && (
              <Text size="xs" c="dimmed" mt={2}>
                USD {Math.round(property.price / property.area).toLocaleString()}/m²
              </Text>
            )}
          </Box>
          <Button
            component="span"
            size="xs"
            radius="md"
            style={{ backgroundColor: PRIMARY, fontWeight: 700, pointerEvents: 'none' }}
          >
            Ver detalle
          </Button>
        </Group>
      </Box>
    </Paper>
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';

  const [operation, setOperation] = useState('Todos');
  const [propType, setPropType] = useState('');
  const [sort, setSort] = useState('relevance');
  const [activeId, setActiveId] = useState(null);

  const mapCenter = getCityCoords(city);

  // Filtrar propiedades según los filtros activos
  // La ciudad en la URL solo se usa para el título/chip del mapa (es un demo)
  const filtered = PROPERTIES.filter((p) => {
    if (operation !== 'Todos' && p.operation !== operation) return false;
    if (propType && p.type !== propType) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'area_desc') return b.area - a.area;
    return b.featured - a.featured;
  });

  return (
    <Box
      style={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
      }}
    >
      {/* ─── LEFT PANEL ─── */}
      <Box
        style={{
          width: '54%',
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}
      >
        {/* Filter bar */}
        <Box
          style={{
            padding: '14px 20px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: 'white',
            flexShrink: 0,
          }}
        >
          {/* Title */}
          <Group gap={8} mb={12} align="center">
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: PRIMARY }}>location_city</span>
            <Title order={3} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#0f172a' }}>
              {city ? `Propiedades en ${city}` : 'Resultados de búsqueda'}
            </Title>
            <Badge
              size="sm"
              variant="light"
              style={{ backgroundColor: `${PRIMARY}15`, color: PRIMARY, fontWeight: 700 }}
              radius="xl"
            >
              {filtered.length} prop.
            </Badge>
          </Group>

          {/* Filters row */}
          <Group gap={10} wrap="nowrap" style={{ overflowX: 'auto', paddingBottom: 4 }}>
            <SegmentedControl
              size="xs"
              value={operation}
              onChange={setOperation}
              data={['Todos', 'Venta', 'Alquiler']}
              styles={{
                root: { backgroundColor: '#f1f5f9', borderRadius: 8 },
                indicator: { backgroundColor: PRIMARY },
                label: { fontWeight: 600, fontSize: 12 },
              }}
            />
            <Select
              size="xs"
              placeholder="Tipo"
              clearable
              value={propType}
              onChange={setPropType}
              data={['Casa', 'Departamento', 'Terreno']}
              radius="md"
              style={{ width: 130, flexShrink: 0 }}
              styles={{ input: { borderColor: '#e5e7eb', fontSize: 12, fontWeight: 500 } }}
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>home</span>}
            />
            <Select
              size="xs"
              value={sort}
              onChange={setSort}
              data={SORT_OPTIONS}
              radius="md"
              style={{ width: 160, flexShrink: 0 }}
              styles={{ input: { borderColor: '#e5e7eb', fontSize: 12, fontWeight: 500 } }}
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 14 }}>sort</span>}
            />
          </Group>
        </Box>

        {/* Property list */}
        <Box
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {filtered.length === 0 ? (
            <Stack align="center" justify="center" style={{ height: '60%' }} gap={12}>
              <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#d1d5db' }}>search_off</span>
              <Text c="dimmed" size="sm" ta="center">No hay propiedades para estos filtros.</Text>
              <Button
                variant="subtle"
                size="xs"
                onClick={() => { setOperation('Todos'); setPropType(''); }}
                style={{ color: PRIMARY }}
              >
                Limpiar filtros
              </Button>
            </Stack>
          ) : (
            filtered.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                isActive={activeId === prop.id}
                onHover={setActiveId}
              />
            ))
          )}
        </Box>
      </Box>

      {/* ─── RIGHT PANEL: MAP ─── */}
      <Box
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#e8edf2',
        }}
      >
        {/* City chip on map */}
        {city && (
          <Box
            style={{
              position: 'absolute',
              top: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              backgroundColor: 'white',
              borderRadius: 24,
              padding: '8px 18px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: SECONDARY }}>location_searching</span>
            <Text size="sm" fw={700} c="dark">{city}</Text>
          </Box>
        )}

        {/* Active property tooltip on map */}
        {activeId && (
          <Box
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              backgroundColor: 'white',
              borderRadius: 12,
              padding: '10px 18px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
              border: `2px solid ${SECONDARY}`,
            }}
          >
            {(() => {
              const p = PROPERTIES.find((x) => x.id === activeId);
              return p ? (
                <Group gap={12} align="center">
                  <Box
                    style={{
                      width: 56,
                      height: 40,
                      borderRadius: 8,
                      backgroundImage: `url('${p.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                    }}
                  />
                  <Stack gap={2}>
                    <Text size="xs" fw={700} c="dark" style={{ maxWidth: 180, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {p.title}
                    </Text>
                    <Text size="xs" c={PRIMARY} fw={800}>{p.currency} {p.price.toLocaleString()}</Text>
                  </Stack>
                </Group>
              ) : null;
            })()}
          </Box>
        )}

        <SearchMap
          properties={filtered}
          activeId={activeId}
          onMarkerClick={setActiveId}
          center={mapCenter}
        />
      </Box>
    </Box>
  );
}
