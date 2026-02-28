'use client';

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
  Select,
  TextInput,
  ActionIcon,
  Anchor,
  Badge,
} from '@mantine/core';
import { FEATURED } from '@/data/properties';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const TRUST_BADGES = [
  { icon: 'verified_user', title: '100% Verificadas', desc: 'Revisión legal completa de cada propiedad.' },
  { icon: 'visibility', title: 'Sin Letra Chica', desc: 'Transparencia total en costos y condiciones.' },
  { icon: 'gavel', title: 'Respaldo Legal', desc: 'Acompañamiento profesional hasta la firma.' },
];

function PropertyCard({ prop }) {
  return (
    <Box
      component={Link}
      href={`/property/${prop.id}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
    >
      <Box style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Box
          style={{
            position: 'absolute', top: 12, left: 12, zIndex: 1,
            backgroundColor: prop.operation === 'Venta' ? SECONDARY : PRIMARY, color: 'white',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
            padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase',
          }}
        >
          {prop.operation}
        </Box>
        <Badge
          size="xs"
          variant="white"
          style={{
            position: 'absolute', top: 12, right: 48, zIndex: 1,
            backgroundColor: 'rgba(255,255,255,0.9)', color: '#334155',
          }}
          radius="sm"
        >
          {prop.type}
        </Badge>
        <Box
          style={{
            width: '100%', height: '100%',
            backgroundImage: `url('${prop.img}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        <ActionIcon variant="white" size="sm" radius="xl"
          style={{ position: 'absolute', bottom: 12, right: 12 }} color="gray">
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
        </ActionIcon>
      </Box>
      <Box p="md">
        <Text fw={700} size="lg" c="dark" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {prop.title}
        </Text>
        <Group gap={4} mt={4}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#6b7280' }}>location_on</span>
          <Text size="sm" c="dimmed">{prop.location}</Text>
        </Group>
        <Group justify="space-between" mt="md" pt="md" style={{ borderTop: '1px solid #f3f4f6' }}>
          <Stack gap={2}>
            <Text fw={700} size="xl" c="dark">{prop.priceLabel}</Text>
            <Text size="xs" c="dimmed">{prop.arsLabel}</Text>
          </Stack>
          <Group gap={12}>
            {prop.bedrooms > 0 && (
              <Group gap={4}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>bed</span>
                <Text size="xs" c="dimmed">{prop.bedrooms}</Text>
              </Group>
            )}
            {prop.bathrooms > 0 && (
              <Group gap={4}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>bathtub</span>
                <Text size="xs" c="dimmed">{prop.bathrooms}</Text>
              </Group>
            )}
            <Group gap={4}>
              <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#9ca3af' }}>square_foot</span>
              <Text size="xs" c="dimmed">{prop.area} m²</Text>
            </Group>
          </Group>
        </Group>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Box
        style={{
          position: 'relative',
          minHeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 16px',
        }}
      >
        <Box
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJIQMrzBcs-GdJk-NnS-HjcgdHhHL2e4npuC_YFbfZFUWMDzgI_jmZ2agVJC7SLmTnd4KU2xW3opNNSSFX5WXTV8ypE8xajatzpWK-AAlQGhVD0upsJXEChuRsdGlNGnm6_QQGkMiIWwvNzoW8NWdumUWgUycYoqcpw0iwAfYJriNXRz0LQIErHTI619KptqcIhk5nihoSbWjhf0pK_PKoDaax1K4RuzuD6EtcJuMx_qO3YYAhzRrJHGkzKoWx2TIAjpi1nhzjgLPf')",
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
        <Box style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1024, textAlign: 'center' }}>
          <Stack gap={32} align="center">
            <Stack gap={16} align="center">
              <Title
                order={1}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 700, color: 'white', lineHeight: 1.2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Encontrá tu próximo hogar con <br />
                <em style={{ color: '#C8923A' }}>seguridad y transparencia</em>
              </Title>
              <Text size="lg" style={{ color: '#e5e7eb', maxWidth: 560, fontWeight: 300 }}>
                Propiedades de lujo en Argentina con la seguridad que mereces.
              </Text>
            </Stack>

            <Paper radius="xl" p="md" shadow="xl" style={{ width: '100%', maxWidth: 860 }}>
              <Group gap="sm" wrap="wrap" align="center">
                <Box style={{ flex: 1, minWidth: 140 }}>
                  <Select
                    placeholder="Comprar"
                    data={['Comprar', 'Alquilar', 'Temporal']}
                    leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>sell</span>}
                    variant="filled" radius="md"
                  />
                </Box>
                <Box style={{ flex: 1, minWidth: 140 }}>
                  <Select
                    placeholder="Casa"
                    data={['Casa', 'Departamento', 'Terreno', 'Oficina']}
                    leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>home_work</span>}
                    variant="filled" radius="md"
                  />
                </Box>
                <Box style={{ flex: 2, minWidth: 220 }}>
                  <TextInput
                    placeholder="Ubicación (ej. Yerba Buena, Tucumán)"
                    leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>}
                    variant="filled" radius="md"
                  />
                </Box>
                <Button
                  component={Link}
                  href="/properties"
                  radius="md"
                  style={{ backgroundColor: SECONDARY, fontWeight: 700, height: 42, paddingLeft: 32, paddingRight: 32 }}
                >
                  Buscar
                </Button>
              </Group>
            </Paper>
          </Stack>
        </Box>
      </Box>

      {/* Trust badges */}
      <Box py={48} px="md" style={{ backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
        <Container size={1280}>
          <Grid gutter="lg">
            {TRUST_BADGES.map((badge) => (
              <Grid.Col key={badge.title} span={{ base: 12, sm: 4 }}>
                <Paper p="xl" radius="lg" style={{ textAlign: 'center', backgroundColor: '#f9fafb' }}>
                  <Box
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 48, height: 48, borderRadius: '50%',
                      backgroundColor: 'rgba(26,60,94,0.1)', color: PRIMARY, marginBottom: 16,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{badge.icon}</span>
                  </Box>
                  <Title order={3} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: '#0f172a' }}>
                    {badge.title}
                  </Title>
                  <Text size="sm" c="dimmed" mt={4}>{badge.desc}</Text>
                </Paper>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured properties */}
      <Box py={64} px="md">
        <Container size={1280}>
          <Group justify="space-between" mb={40} align="flex-end">
            <Stack gap={4}>
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: '#0f172a' }}>
                Propiedades Destacadas
              </Title>
              <Text size="sm" c="dimmed">Oportunidades exclusivas seleccionadas para vos.</Text>
            </Stack>
            <Anchor component={Link} href="/properties" style={{ fontSize: 14, fontWeight: 700, color: PRIMARY }}>
              Ver todas →
            </Anchor>
          </Group>
          <Grid gutter="xl">
            {FEATURED.map((prop) => (
              <Grid.Col key={prop.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <PropertyCard prop={prop} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* WhatsApp FAB */}
      <Box
        component="a" href="https://wa.me/5493814123456?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20propiedades" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 56, height: 56, borderRadius: '50%',
          backgroundColor: '#25D366', color: 'white',
          boxShadow: '0 8px 25px rgba(37,211,102,0.35)',
          transition: 'transform 0.3s, background-color 0.3s',
          textDecoration: 'none',
        }}
      >
        <svg width={30} height={30} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </Box>
    </>
  );
}
