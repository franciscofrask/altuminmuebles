'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  TextInput,
  Textarea,
  ActionIcon,
  Anchor,
  Divider,
  Badge,
  Avatar,
  Progress,
} from '@mantine/core';

// Mapa cargado solo en el cliente (Leaflet necesita window)
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <Box style={{
      width: '100%', height: '100%', borderRadius: 16,
      backgroundColor: '#f1f5f9', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text c="dimmed" size="sm">Cargando mapa...</Text>
    </Box>
  ),
});

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFu8pMNwOURprODSVAmkebWPuWlDF_FNwCsroho48bfiOfPCH7XZ6bfLyD6iu7tJ-TgJhvCV0UG3g4kgZ7HIr0McV8a0HVham4Qpe0cD7PAMX5vofUNmI05HJreAtqXODaD-Pbhhjherphg-E4-z2EzxaPyLDFrHJE4jDfUYpfe2oIILL4KWlYi7RnzjrnElE_oMYOuQ5uvz4eF7FM5h8TLm3qGDYedKTxdAgb5ZKvg-elwMUobPl6MQBPgs34zk6JbbhnoJv9zPf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuyGwEDPRWdJ9WxZUKGu3ZrD00MHRn8Mv8WdSe-SvJ6QlSkG-ZCFbiduWP90kFpkY5LMK-lOHV6qbIsTsD8TE6IJjXSHaSP5HrDd9ePtoKs8KfJl8QxWayTAuKFhOjMEpHYnoerC4zsOg0qI87KOIYYJjkNDoMmrGFur_2unthY6orEq4Ei9s6C-5c_g_CGKelKnj8iiCw1smWp5uTYF4J8pII7qRqCMG5Ec4E-tImQppz9KAN3M71Cao6RR6oHUQRMIxhrv631TMQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBqeqyutnFvNVEO7lFUcATEZaTZWWVuvBSpflSeHm8sQvCLoOLeAkNNJGj8tctPcWWaxIOt-dNOV3-2a1tZOZwBNvkQi4PMkpNofroKAksc35ayFbFGaKuQKWTJwHf4yxkEDqwewsSkCqQ9y08dLc_IibQqRdXD2YN2nNjQUBlGT4VP0PqdjIrFE5AOekaiUqdq8LqhCpqG07UsBzhCx6u1XxH9BxF0-0gyJH6uNEgxBPl-6H7bk1dbMH908S2zEnx_koN1fKapmIjl',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFu8pMNwOURprODSVAmkebWPuWlDF_FNwCsroho48bfiOfPCH7XZ6bfLyD6iu7tJ-TgJhvCV0UG3g4kgZ7HIr0McV8a0HVham4Qpe0cD7PAMX5vofUNmI05HJreAtqXODaD-Pbhhjherphg-E4-z2EzxaPyLDFrHJE4jDfUYpfe2oIILL4KWlYi7RnzjrnElE_oMYOuQ5uvz4eF7FM5h8TLm3qGDYedKTxdAgb5ZKvg-elwMUobPl6MQBPgs34zk6JbbhnoJv9zPf',
];

const AMENITIES = [
  { icon: 'pool', label: 'Piscina' },
  { icon: 'outdoor_grill', label: 'Asador' },
  { icon: 'security', label: 'Seguridad 24hs' },
  { icon: 'ac_unit', label: 'Aire Acondicionado' },
  { icon: 'local_laundry_service', label: 'Lavadero' },
  { icon: 'park', label: 'Jardín' },
  { icon: 'garage', label: 'Cochera cubierta' },
  { icon: 'hot_tub', label: 'Solarium' },
  { icon: 'wifi', label: 'Fibra óptica' },
];

const FEATURES = [
  { icon: 'square_foot', label: 'Superficie Total', value: '210 m²' },
  { icon: 'bed', label: 'Dormitorios', value: '3' },
  { icon: 'bathtub', label: 'Baños', value: '2' },
  { icon: 'directions_car', label: 'Cocheras', value: '2' },
];

const REVIEWS = [
  {
    name: 'Patricia V.',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 5,
    date: 'Enero 2026',
    text: 'Excelente atención de la inmobiliaria y una propiedad que superó todas mis expectativas. El proceso fue transparente de principio a fin.',
  },
  {
    name: 'Roberto M.',
    avatar: 'https://i.pravatar.cc/150?img=52',
    rating: 5,
    date: 'Diciembre 2025',
    text: 'Compré mi departamento a través de Altum y fue una experiencia muy profesional. Muy recomendable para quienes buscan seguridad y seriedad.',
  },
  {
    name: 'Lucía T.',
    avatar: 'https://i.pravatar.cc/150?img=25',
    rating: 4,
    date: 'Noviembre 2025',
    text: 'La zona es inmejorable y la casa cumple todo lo que se promete. El mapa en la web también ayuda mucho para entender la ubicación.',
  },
];

const RATING_BARS = [
  { label: 'Ubicación', value: 95 },
  { label: 'Calidad', value: 90 },
  { label: 'Precio', value: 82 },
  { label: 'Atención', value: 98 },
];

function StarRating({ rating, size = 16 }) {
  return (
    <Group gap={2}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="material-symbols-outlined"
          style={{
            fontSize: size,
            color: star <= rating ? '#f59e0b' : '#d1d5db',
            fontVariationSettings: "'FILL' 1",
          }}
        >
          star
        </span>
      ))}
    </Group>
  );
}

export default function PropertyDetail() {
  const [activeImg, setActiveImg] = useState(0);
  const [favd, setFavd] = useState(false);

  return (
    <Container size={1280} px={{ base: 16, md: 40 }} py={32}>
      {/* Breadcrumbs */}
      <Group gap={8} mb={24}>
        <Anchor component={Link} href="/" c="dimmed" style={{ fontSize: 14 }}>Inicio</Anchor>
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af' }}>chevron_right</span>
        <Anchor component={Link} href="/properties" c="dimmed" style={{ fontSize: 14 }}>Propiedades</Anchor>
        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af' }}>chevron_right</span>
        <Text size="sm" c="dark" fw={500}>Casa Minimalista en La Rinconada</Text>
      </Group>

      {/* Header */}
      <Group justify="space-between" align="flex-start" mb={32} wrap="wrap" gap="lg">
        <Stack gap={12}>
          <Group gap={8}>
            <Badge style={{ backgroundColor: SECONDARY, color: 'white' }} radius="sm">Venta</Badge>
            <Badge variant="light" color="gray" radius="sm">Casa</Badge>
            <Badge variant="light" color="green" radius="sm">Disponible</Badge>
          </Group>
          <Title
            order={1}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0f172a' }}
          >
            Casa Minimalista en La Rinconada
          </Title>
          <Group gap={8} align="center">
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#6b7280' }}>location_on</span>
            <Text c="dimmed">Av. Aconquija 1850, Yerba Buena, Tucumán</Text>
            <Anchor href="#map" style={{ fontSize: 14, fontWeight: 500, color: PRIMARY, marginLeft: 8 }}>Ver en mapa →</Anchor>
          </Group>
          <Group gap={4}>
            <StarRating rating={5} />
            <Text size="sm" c="dimmed" ml={4}>4.9 · 3 reseñas</Text>
          </Group>
        </Stack>

        <Stack align="flex-end" gap={8}>
          <Text style={{ fontSize: 34, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>USD 320.000</Text>
          <Text size="sm" c="dimmed">≈ ARS 384.000.000</Text>
          <Text size="xs" c="dimmed">USD 1.524 / m²</Text>
          <Group gap={10} mt={8}>
            <ActionIcon
              variant="outline" size="lg" radius="md"
              style={{ borderColor: '#e5e7eb' }}
              onClick={() => {
                if (navigator.share) navigator.share({ title: 'Casa en La Rinconada', url: window.location.href });
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>share</span>
            </ActionIcon>
            <ActionIcon
              variant={favd ? 'filled' : 'outline'}
              color={favd ? 'red' : 'gray'}
              size="lg" radius="md"
              style={{ borderColor: favd ? undefined : '#e5e7eb' }}
              onClick={() => setFavd((v) => !v)}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 20, fontVariationSettings: favd ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </ActionIcon>
          </Group>
        </Stack>
      </Group>

      {/* Gallery */}
      <Box mb={48}>
        {/* Main image */}
        <Box
          style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            height: 'clamp(280px, 45vw, 520px)',
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <Box
            style={{
              width: '100%', height: '100%',
              backgroundImage: `url('${IMAGES[activeImg]}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              transition: 'background-image 0.3s',
            }}
          />
          <Box style={{ position: 'absolute', top: 16, right: 16 }}>
            <Button
              size="xs" radius="md" variant="white"
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 15 }}>photo_library</span>}
              style={{ fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              Ver todas ({IMAGES.length + 10})
            </Button>
          </Box>
        </Box>
        {/* Thumbnails */}
        <Group gap={10} wrap="nowrap" style={{ overflowX: 'auto', paddingBottom: 4 }}>
          {IMAGES.map((img, idx) => (
            <Box
              key={idx}
              onClick={() => setActiveImg(idx)}
              style={{
                flexShrink: 0,
                width: 100, height: 68,
                borderRadius: 10, overflow: 'hidden',
                cursor: 'pointer',
                border: `2.5px solid ${activeImg === idx ? PRIMARY : 'transparent'}`,
                opacity: activeImg === idx ? 1 : 0.7,
                transition: 'all 0.2s',
              }}
            >
              <Box
                style={{
                  width: '100%', height: '100%',
                  backgroundImage: `url('${img}')`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }}
              />
            </Box>
          ))}
          <Box
            style={{
              flexShrink: 0, width: 100, height: 68,
              borderRadius: 10, overflow: 'hidden',
              backgroundColor: '#0f172a', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Stack gap={2} align="center">
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: 'white' }}>add_photo_alternate</span>
              <Text size="xs" c="white" fw={600}>+10</Text>
            </Stack>
          </Box>
        </Group>
      </Box>

      <Grid gutter={48}>
        {/* Main content */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap={48}>

            {/* Key features */}
            <Grid gutter="md">
              {FEATURES.map((feat) => (
                <Grid.Col key={feat.label} span={{ base: 6, sm: 3 }}>
                  <Paper p="md" radius="lg" shadow="xs" style={{ textAlign: 'center', border: '1px solid #f3f4f6' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28, color: PRIMARY, display: 'block', marginBottom: 8 }}>{feat.icon}</span>
                    <Text size="xs" c="dimmed">{feat.label}</Text>
                    <Text fw={700} c="dark" size="lg">{feat.value}</Text>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>

            <Divider />

            {/* Description */}
            <Box>
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 16 }}>
                Descripción
              </Title>
              <Stack gap="md">
                <Text c="dimmed" lh={1.8}>
                  Excepcional casa de diseño minimalista ubicada en el exclusivo country La Rinconada, Yerba Buena. La propiedad se destaca por sus líneas puras, amplios ventanales y excelente iluminación natural en todos sus ambientes.
                </Text>
                <Text c="dimmed" lh={1.8}>
                  Desarrollada en dos plantas, cuenta con un amplio living comedor integrado a una cocina moderna con isla central, toilette de recepción y galería con asador. En la planta alta se encuentran 3 dormitorios, el principal en suite con vestidor, y un baño completo adicional.
                </Text>
                <Text c="dimmed" lh={1.8}>
                  El jardín, cuidadosamente diseñado, incluye una piscina revestida y solarium. Cochera cubierta para dos vehículos. Seguridad privada las 24hs.
                </Text>
              </Stack>
            </Box>

            <Divider />

            {/* Amenities */}
            <Box>
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 24 }}>
                Características y Amenities
              </Title>
              <Grid gutter="sm">
                {AMENITIES.map((a) => (
                  <Grid.Col key={a.label} span={{ base: 6, sm: 4 }}>
                    <Group gap={10} style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: PRIMARY }}>{a.icon}</span>
                      <Text size="sm" c="dark" fw={500}>{a.label}</Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>

            <Divider />

            {/* Map */}
            <Box id="map">
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 8 }}>
                Ubicación
              </Title>
              <Group gap={8} mb={20}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#6b7280' }}>location_on</span>
                <Text size="sm" c="dimmed">Av. Aconquija 1850, Yerba Buena, Tucumán · La ubicación exacta se confirma al reservar la visita.</Text>
              </Group>
              <Box style={{ height: 380, borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <PropertyMap
                  lat={-26.8167}
                  lng={-65.2495}
                  title="Casa Minimalista en La Rinconada"
                />
              </Box>
              {/* POIs cercanos */}
              <Grid gutter="sm" mt="md">
                {[
                  { icon: 'school', label: 'Colegio San Pablo', dist: '350 m' },
                  { icon: 'local_hospital', label: 'Clínica Los Laureles', dist: '1.2 km' },
                  { icon: 'shopping_cart', label: 'Supermercado Vea', dist: '800 m' },
                  { icon: 'directions_bus', label: 'Parada de colectivo', dist: '120 m' },
                ].map((poi) => (
                  <Grid.Col key={poi.label} span={{ base: 6, sm: 3 }}>
                    <Group gap={8} style={{ backgroundColor: '#f8fafc', borderRadius: 10, padding: '10px 12px', border: '1px solid #f1f5f9' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 18, color: SECONDARY }}>{poi.icon}</span>
                      <Stack gap={0}>
                        <Text size="xs" fw={600} c="dark">{poi.label}</Text>
                        <Text size="xs" c="dimmed">{poi.dist}</Text>
                      </Stack>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>

            <Divider />

            {/* Reviews */}
            <Box>
              <Group justify="space-between" mb={24} align="flex-end">
                <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a' }}>
                  Reseñas
                </Title>
                <Group gap={8} align="center">
                  <Text style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>4.9</Text>
                  <Stack gap={4}>
                    <StarRating rating={5} size={14} />
                    <Text size="xs" c="dimmed">3 reseñas</Text>
                  </Stack>
                </Group>
              </Group>

              {/* Rating bars */}
              <Grid gutter="sm" mb={32}>
                {RATING_BARS.map((bar) => (
                  <Grid.Col key={bar.label} span={{ base: 12, sm: 6 }}>
                    <Group gap={12} wrap="nowrap">
                      <Text size="sm" c="dimmed" style={{ minWidth: 72 }}>{bar.label}</Text>
                      <Progress value={bar.value} flex={1} size="sm" radius="xl" color={PRIMARY} />
                      <Text size="sm" fw={600} c="dark" style={{ minWidth: 32, textAlign: 'right' }}>{(bar.value / 20).toFixed(1)}</Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>

              {/* Review cards */}
              <Stack gap="lg">
                {REVIEWS.map((review) => (
                  <Paper key={review.name} p="lg" radius="xl" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fafafa' }}>
                    <Group justify="space-between" mb={12} align="flex-start">
                      <Group gap={12}>
                        <Avatar src={review.avatar} size={44} radius={44} />
                        <Stack gap={2}>
                          <Text fw={700} c="dark" size="sm">{review.name}</Text>
                          <Text size="xs" c="dimmed">{review.date}</Text>
                        </Stack>
                      </Group>
                      <StarRating rating={review.rating} size={14} />
                    </Group>
                    <Text size="sm" c="dimmed" lh={1.7}>{review.text}</Text>
                  </Paper>
                ))}
              </Stack>

              <Button
                variant="outline"
                radius="md"
                mt="lg"
                style={{ borderColor: '#e5e7eb', color: '#334155', fontWeight: 600 }}
              >
                Ver todas las reseñas
              </Button>
            </Box>

          </Stack>
        </Grid.Col>

        {/* Contact sidebar */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper
            p="xl"
            radius="xl"
            shadow="xl"
            style={{ position: 'sticky', top: 100, border: '1px solid #f3f4f6' }}
          >
            {/* Price preview */}
            <Box mb={20} pb={20} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <Text style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>USD 320.000</Text>
              <Text size="xs" c="dimmed" mt={4}>≈ ARS 384.000.000 · USD 1.524/m²</Text>
            </Box>

            {/* Agent */}
            <Group gap="md" mb={20}>
              <Box style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb', flexShrink: 0 }}>
                <img src="https://i.pravatar.cc/150?img=68" alt="Agente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Stack gap={2}>
                <Text fw={700} c="dark">Martín Altum</Text>
                <Text size="sm" c="dimmed">Agente Inmobiliario</Text>
                <Group gap={4}>
                  <StarRating rating={5} size={12} />
                  <Text size="xs" c="dimmed">· Mat. 123</Text>
                </Group>
              </Stack>
            </Group>

            <Stack gap="sm">
              <TextInput placeholder="Nombre completo" variant="filled" radius="md" />
              <TextInput type="email" placeholder="Email" variant="filled" radius="md" />
              <TextInput type="tel" placeholder="Teléfono" variant="filled" radius="md" />
              <Textarea rows={3} placeholder="Hola, me interesa esta propiedad..." variant="filled" radius="md" />

              <Button
                fullWidth radius="md"
                style={{ backgroundColor: PRIMARY, fontWeight: 700, boxShadow: '0 4px 14px rgba(26,60,94,0.25)' }}
                leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>mail</span>}
              >
                Contactar Agente
              </Button>

              <Button
                component="a"
                href="https://wa.me/5493814123456?text=Hola%2C%20me%20interesa%20la%20propiedad%20Casa%20Minimalista%20en%20La%20Rinconada"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth radius="md"
                style={{ backgroundColor: '#25D366', fontWeight: 700, color: 'white' }}
                leftSection={
                  <svg width={18} height={18} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                }
              >
                WhatsApp
              </Button>

              <Button
                variant="subtle"
                fullWidth radius="md"
                style={{ color: '#334155', fontWeight: 600 }}
                leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>}
              >
                Solicitar visita
              </Button>
            </Stack>

            <Text size="xs" c="dimmed" ta="center" mt={16}>
              Respondemos en menos de 2 horas hábiles
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
