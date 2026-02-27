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
  Image,
} from '@mantine/core';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFu8pMNwOURprODSVAmkebWPuWlDF_FNwCsroho48bfiOfPCH7XZ6bfLyD6iu7tJ-TgJhvCV0UG3g4kgZ7HIr0McV8a0HVham4Qpe0cD7PAMX5vofUNmI05HJreAtqXODaD-Pbhhjherphg-E4-z2EzxaPyLDFrHJE4jDfUYpfe2oIILL4KWlYi7RnzjrnElE_oMYOuQ5uvz4eF7FM5h8TLm3qGDYedKTxdAgb5ZKvg-elwMUobPl6MQBPgs34zk6JbbhnoJv9zPf',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuyGwEDPRWdJ9WxZUKGu3ZrD00MHRn8Mv8WdSe-SvJ6QlSkG-ZCFbiduWP90kFpkY5LMK-lOHV6qbIsTsD8TE6IJjXSHaSP5HrDd9ePtoKs8KfJl8QxWayTAuKFhOjMEpHYnoerC4zsOg0qI87KOIYYJjkNDoMmrGFur_2unthY6orEq4Ei9s6C-5c_g_CGKelKnj8iiCw1smWp5uTYF4J8pII7qRqCMG5Ec4E-tImQppz9KAN3M71Cao6RR6oHUQRMIxhrv631TMQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBqeqyutnFvNVEO7lFUcATEZaTZWWVuvBSpflSeHm8sQvCLoOLeAkNNJGj8tctPcWWaxIOt-dNOV3-2a1tZOZwBNvkQi4PMkpNofroKAksc35ayFbFGaKuQKWTJwHf4yxkEDqwewsSkCqQ9y08dLc_IibQqRdXD2YN2nNjQUBlGT4VP0PqdjIrFE5AOekaiUqdq8LqhCpqG07UsBzhCx6u1XxH9BxF0-0gyJH6uNEgxBPl-6H7bk1dbMH908S2zEnx_koN1fKapmIjl',
];

const AMENITIES = [
  { icon: 'pool', label: 'Piscina' },
  { icon: 'outdoor_grill', label: 'Asador' },
  { icon: 'security', label: 'Seguridad 24hs' },
  { icon: 'ac_unit', label: 'Aire Acondicionado' },
  { icon: 'local_laundry_service', label: 'Lavadero' },
  { icon: 'park', label: 'Jardín' },
];

const FEATURES = [
  { icon: 'square_foot', label: 'Superficie Total', value: '210 m²' },
  { icon: 'bed', label: 'Dormitorios', value: '3' },
  { icon: 'bathtub', label: 'Baños', value: '2' },
  { icon: 'directions_car', label: 'Cocheras', value: '2' },
];

export default function PropertyDetail() {
  return (
    <Container size={1280} px={{ base: 16, md: 40 }} py={32}>
      {/* Breadcrumbs */}
      <Group gap={8} mb={24} style={{ fontSize: 14, color: '#6b7280' }}>
        <Anchor component={Link} href="/" c="dimmed" style={{ fontSize: 14 }}>Inicio</Anchor>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
        <Anchor component={Link} href="/properties" c="dimmed" style={{ fontSize: 14 }}>Venta</Anchor>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
        <Text size="sm" c="dark" fw={500}>Casa Minimalista en La Rinconada</Text>
      </Group>

      {/* Header */}
      <Group justify="space-between" align="flex-start" mb={32} wrap="wrap" gap="lg">
        <Stack gap={12}>
          <Group gap={8}>
            <Box style={{ backgroundColor: SECONDARY, color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
              Venta
            </Box>
            <Box style={{ backgroundColor: '#f3f4f6', color: '#334155', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
              Casa
            </Box>
          </Group>
          <Title order={1} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#0f172a' }}>
            Casa Minimalista en La Rinconada
          </Title>
          <Group gap={8} align="center">
            <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#6b7280' }}>location_on</span>
            <Text c="dimmed">Yerba Buena, Tucumán</Text>
            <Anchor href="#map" style={{ fontSize: 14, fontWeight: 500, color: PRIMARY, marginLeft: 8 }}>Ver en mapa</Anchor>
          </Group>
        </Stack>

        <Stack align="flex-end" gap={8}>
          <Text style={{ fontSize: 30, fontWeight: 700, color: '#0f172a' }}>USD 320.000</Text>
          <Text size="sm" c="dimmed">ARS 384.000.000</Text>
          <Group gap={12} mt={8}>
            <ActionIcon variant="outline" size="lg" radius="md" style={{ borderColor: '#e5e7eb' }}>
              <span className="material-symbols-outlined">share</span>
            </ActionIcon>
            <ActionIcon variant="outline" size="lg" radius="md" style={{ borderColor: '#e5e7eb', color: '#ef4444' }}>
              <span className="material-symbols-outlined">favorite</span>
            </ActionIcon>
          </Group>
        </Stack>
      </Group>

      {/* Gallery */}
      <Box
        mb={48}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 16,
          height: 'clamp(300px, 50vw, 600px)',
        }}
      >
        <Box style={{ gridColumn: '1 / span 2', gridRow: '1 / span 2', borderRadius: 12, overflow: 'hidden' }}>
          <Box style={{ width: '100%', height: '100%', backgroundImage: `url('${IMAGES[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </Box>
        {IMAGES.slice(1).map((img, idx) => (
          <Box key={idx} style={{ borderRadius: 12, overflow: 'hidden' }}>
            <Box style={{ width: '100%', height: '100%', backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </Box>
        ))}
        <Box style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          <Box style={{ width: '100%', height: '100%', backgroundImage: `url('${IMAGES[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <Box style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Text fw={700} c="white" size="lg">+12 Fotos</Text>
          </Box>
        </Box>
      </Box>

      <Grid gutter={48}>
        {/* Main content */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap={48}>
            {/* Key features */}
            <Grid gutter="md">
              {FEATURES.map((feat) => (
                <Grid.Col key={feat.label} span={6} sm={3}>
                  <Paper p="md" radius="lg" shadow="xs" style={{ textAlign: 'center', border: '1px solid #f3f4f6' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 28, color: PRIMARY, display: 'block', marginBottom: 8 }}>{feat.icon}</span>
                    <Text size="sm" c="dimmed">{feat.label}</Text>
                    <Text fw={700} c="dark">{feat.value}</Text>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>

            {/* Description */}
            <Box>
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#0f172a', marginBottom: 16 }}>
                Descripción
              </Title>
              <Stack gap="md">
                <Text c="dimmed" lh={1.7}>
                  Excepcional casa de diseño minimalista ubicada en el exclusivo country La Rinconada, Yerba Buena. La propiedad se destaca por sus líneas puras, amplios ventanales y excelente iluminación natural en todos sus ambientes.
                </Text>
                <Text c="dimmed" lh={1.7}>
                  Desarrollada en dos plantas, cuenta con un amplio living comedor integrado a una cocina moderna con isla central, toilette de recepción y galería con asador. En la planta alta se encuentran 3 dormitorios, el principal en suite con vestidor, y un baño completo adicional.
                </Text>
                <Text c="dimmed" lh={1.7}>
                  El jardín, cuidadosamente diseñado, incluye una piscina revestida y solarium. Cochera cubierta para dos vehículos.
                </Text>
              </Stack>
            </Box>

            {/* Amenities */}
            <Box>
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#0f172a', marginBottom: 24 }}>
                Características y Amenities
              </Title>
              <Grid gutter="md">
                {AMENITIES.map((a) => (
                  <Grid.Col key={a.label} span={{ base: 6, sm: 4 }}>
                    <Group gap={12}>
                      <span className="material-symbols-outlined" style={{ color: PRIMARY }}>{a.icon}</span>
                      <Text c="dark">{a.label}</Text>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
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
            <Group gap="md" mb={24}>
              <Box
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  overflow: 'hidden', backgroundColor: '#e5e7eb', flexShrink: 0,
                }}
              >
                <img src="https://i.pravatar.cc/150?img=68" alt="Agente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Stack gap={2}>
                <Text fw={700} c="dark">Martín Altum</Text>
                <Text size="sm" c="dimmed">Agente Inmobiliario</Text>
                <Text size="xs" c="dimmed">Mat. C.C.I.T. 123</Text>
              </Stack>
            </Group>

            <Stack gap="sm">
              <TextInput placeholder="Nombre completo" variant="filled" radius="md" />
              <TextInput type="email" placeholder="Email" variant="filled" radius="md" />
              <TextInput type="tel" placeholder="Teléfono" variant="filled" radius="md" />
              <Textarea rows={4} placeholder="Hola, me interesa esta propiedad..." variant="filled" radius="md" />
              <Button
                fullWidth radius="md"
                style={{ backgroundColor: PRIMARY, fontWeight: 700, boxShadow: '0 4px 14px rgba(26,60,94,0.25)' }}
              >
                Contactar Agente
              </Button>
              <Button
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
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
