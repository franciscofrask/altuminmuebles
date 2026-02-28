'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Stack,
  Text,
  Title,
  Button,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Divider,
  Group,
  SegmentedControl,
  Avatar,
  Grid,
  Badge,
  ActionIcon,
  Tabs,
} from '@mantine/core';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const FAVORITOS = [
  {
    id: 1,
    title: 'Casa Minimalista en La Rinconada',
    location: 'Yerba Buena, Tucumán',
    price: 'USD 320.000',
    arsPrice: 'ARS 384.000.000',
    type: 'Venta',
    beds: 3, baths: 2, area: '210m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaFu8pMNwOURprODSVAmkebWPuWlDF_FNwCsroho48bfiOfPCH7XZ6bfLyD6iu7tJ-TgJhvCV0UG3g4kgZ7HIr0McV8a0HVham4Qpe0cD7PAMX5vofUNmI05HJreAtqXODaD-Pbhhjherphg-E4-z2EzxaPyLDFrHJE4jDfUYpfe2oIILL4KWlYi7RnzjrnElE_oMYOuQ5uvz4eF7FM5h8TLm3qGDYedKTxdAgb5ZKvg-elwMUobPl6MQBPgs34zk6JbbhnoJv9zPf',
  },
  {
    id: 3,
    title: 'Casa en Country Las Yungas',
    location: 'Yerba Buena, Tucumán',
    price: 'USD 450.000',
    arsPrice: 'ARS 540.000.000',
    type: 'Venta',
    beds: 4, baths: 3, area: '320m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuyGwEDPRWdJ9WxZUKGu3ZrD00MHRn8Mv8WdSe-SvJ6QlSkG-ZCFbiduWP90kFpkY5LMK-lOHV6qbIsTsD8TE6IJjXSHaSP5HrDd9ePtoKs8KfJl8QxWayTAuKFhOjMEpHYnoerC4zsOg0qI87KOIYYJjkNDoMmrGFur_2unthY6orEq4Ei9s6C-5c_g_CGKelKnj8iiCw1smWp5uTYF4J8pII7qRqCMG5Ec4E-tImQppz9KAN3M71Cao6RR6oHUQRMIxhrv631TMQ',
  },
];

function PropertyFavCard({ prop, onRemove }) {
  return (
    <Box
      style={{
        borderRadius: 12, overflow: 'hidden', backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb',
      }}
    >
      <Box style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <Box style={{
          position: 'absolute', top: 12, left: 12, zIndex: 1,
          backgroundColor: SECONDARY, color: 'white',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
          padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase',
        }}>
          {prop.type}
        </Box>
        <Box style={{
          width: '100%', height: '100%',
          backgroundImage: `url('${prop.image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <ActionIcon
          variant="filled" size="md" radius="xl" color="red"
          onClick={() => onRemove(prop.id)}
          style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, opacity: 0.9 }}
          title="Quitar de favoritos"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </ActionIcon>
      </Box>
      <Box p="md">
        <Text fw={700} size="md" c="dark" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {prop.title}
        </Text>
        <Group gap={4} mt={4} mb="sm">
          <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#6b7280' }}>location_on</span>
          <Text size="sm" c="dimmed">{prop.location}</Text>
        </Group>
        <Group justify="space-between" pt="sm" style={{ borderTop: '1px solid #f3f4f6' }}>
          <Stack gap={2}>
            <Text fw={700} size="lg" c="dark">{prop.price}</Text>
            <Text size="xs" c="dimmed">{prop.arsPrice}</Text>
          </Stack>
          <Group gap={10}>
            {[['bed', prop.beds], ['bathtub', prop.baths], ['square_foot', prop.area]].map(([icon, val]) => (
              <Group key={icon} gap={3}>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#9ca3af' }}>{icon}</span>
                <Text size="xs" c="dimmed">{val}</Text>
              </Group>
            ))}
          </Group>
        </Group>
        <Button
          component={Link}
          href={`/property/${prop.id}`}
          fullWidth
          variant="light"
          radius="md"
          size="sm"
          mt="sm"
          style={{ color: PRIMARY, fontWeight: 600 }}
        >
          Ver propiedad
        </Button>
      </Box>
    </Box>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [favoritos, setFavoritos] = useState(FAVORITOS);

  const removeFav = (id) => setFavoritos((prev) => prev.filter((p) => p.id !== id));

  return (
    <Box style={{ backgroundColor: '#f6f7f8', minHeight: 'calc(100vh - 80px)' }}>
      <Container size={1100} px={{ base: 16, md: 32 }} py={40}>
        <Grid gutter={32}>
          {/* Sidebar */}
          <Grid.Col span={{ base: 12, sm: 3 }}>
            <Stack gap="md">
              <Paper p="xl" radius="xl" shadow="xs" style={{ border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <Box style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                  <Avatar
                    src="https://i.pravatar.cc/150?img=12"
                    size={80}
                    radius={80}
                    mx="auto"
                  />
                  <Box
                    style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 24, height: 24, borderRadius: '50%',
                      backgroundColor: SECONDARY, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', border: '2px solid white',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 13, color: 'white' }}>edit</span>
                  </Box>
                </Box>
                <Text fw={700} c="dark" size="lg">Francisco García</Text>
                <Text size="sm" c="dimmed">francisco@email.com</Text>
                <Badge mt={8} color="green" variant="light" size="sm">Cuenta verificada</Badge>
              </Paper>

              <Paper radius="xl" shadow="xs" style={{ border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                {[
                  { key: 'perfil', icon: 'person', label: 'Mi Perfil' },
                  { key: 'favoritos', icon: 'favorite', label: 'Favoritos', count: favoritos.length },
                  { key: 'consultas', icon: 'chat', label: 'Mis Consultas', count: 2 },
                ].map((item) => (
                  <Box
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 20px', cursor: 'pointer', transition: 'background 0.15s',
                      backgroundColor: activeTab === item.key ? 'rgba(26,60,94,0.07)' : 'white',
                      borderLeft: `3px solid ${activeTab === item.key ? PRIMARY : 'transparent'}`,
                    }}
                    onMouseEnter={(e) => { if (activeTab !== item.key) e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                    onMouseLeave={(e) => { if (activeTab !== item.key) e.currentTarget.style.backgroundColor = 'white'; }}
                  >
                    <Group gap={10}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: activeTab === item.key ? PRIMARY : '#6b7280' }}>{item.icon}</span>
                      <Text size="sm" fw={activeTab === item.key ? 700 : 500} c={activeTab === item.key ? PRIMARY : 'dark'}>{item.label}</Text>
                    </Group>
                    {item.count !== undefined && (
                      <Badge size="sm" circle style={{ backgroundColor: activeTab === item.key ? PRIMARY : '#e5e7eb', color: activeTab === item.key ? 'white' : '#334155' }}>
                        {item.count}
                      </Badge>
                    )}
                  </Box>
                ))}
                <Divider />
                <Box
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '14px 20px', cursor: 'pointer', color: '#ef4444',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fff5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>logout</span>
                  <Text size="sm" fw={500} c="red">Cerrar sesión</Text>
                </Box>
              </Paper>
            </Stack>
          </Grid.Col>

          {/* Main content */}
          <Grid.Col span={{ base: 12, sm: 9 }}>
            {/* MI PERFIL */}
            {activeTab === 'perfil' && (
              <Paper p="xl" radius="xl" shadow="xs" style={{ border: '1px solid #f3f4f6' }}>
                <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 4 }}>
                  Mi Perfil
                </Title>
                <Text size="sm" c="dimmed" mb={28}>Actualizá tu información personal.</Text>

                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Nombre" defaultValue="Francisco" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Apellido" defaultValue="García" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput label="Email" type="email" defaultValue="francisco@email.com" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput label="Teléfono" type="tel" defaultValue="381 412 3456" variant="filled" radius="md" />
                  </Grid.Col>
                </Grid>

                <Divider my="xl" label="Seguridad" labelPosition="left" />

                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <PasswordInput label="Contraseña actual" placeholder="••••••••" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <PasswordInput label="Nueva contraseña" placeholder="••••••••" variant="filled" radius="md" />
                  </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="xl">
                  <Button variant="default" radius="md">Cancelar</Button>
                  <Button radius="md" style={{ backgroundColor: PRIMARY, fontWeight: 700, boxShadow: '0 4px 14px rgba(26,60,94,0.2)' }}>
                    Guardar cambios
                  </Button>
                </Group>
              </Paper>
            )}

            {/* FAVORITOS */}
            {activeTab === 'favoritos' && (
              <Stack gap="lg">
                <Box>
                  <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 4 }}>
                    Favoritos
                  </Title>
                  <Text size="sm" c="dimmed">{favoritos.length} {favoritos.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}</Text>
                </Box>
                {favoritos.length === 0 ? (
                  <Paper p={48} radius="xl" shadow="xs" style={{ border: '1px solid #f3f4f6', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#d1d5db', display: 'block', marginBottom: 16 }}>favorite_border</span>
                    <Text fw={600} c="dimmed" size="lg">No tenés propiedades guardadas</Text>
                    <Text size="sm" c="dimmed" mt={4} mb={24}>Explorá el catálogo y guardá las que más te gusten.</Text>
                    <Button
                      component={Link}
                      href="/properties"
                      radius="md"
                      style={{ backgroundColor: PRIMARY, fontWeight: 700 }}
                    >
                      Ver propiedades
                    </Button>
                  </Paper>
                ) : (
                  <Grid gutter="lg">
                    {favoritos.map((prop) => (
                      <Grid.Col key={prop.id} span={{ base: 12, sm: 6 }}>
                        <PropertyFavCard prop={prop} onRemove={removeFav} />
                      </Grid.Col>
                    ))}
                  </Grid>
                )}
              </Stack>
            )}

            {/* CONSULTAS */}
            {activeTab === 'consultas' && (
              <Paper p="xl" radius="xl" shadow="xs" style={{ border: '1px solid #f3f4f6' }}>
                <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, color: '#0f172a', marginBottom: 4 }}>
                  Mis Consultas
                </Title>
                <Text size="sm" c="dimmed" mb={28}>Historial de consultas realizadas a agentes.</Text>
                <Stack gap="md">
                  {[
                    { title: 'Casa Minimalista en La Rinconada', date: '18 feb 2026', estado: 'Respondida', color: 'green' },
                    { title: 'Departamento Premium Centro', date: '24 feb 2026', estado: 'Pendiente', color: 'yellow' },
                  ].map((c) => (
                    <Box
                      key={c.title}
                      style={{ padding: 16, borderRadius: 12, border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}
                    >
                      <Group justify="space-between" wrap="wrap" gap={8}>
                        <Stack gap={4}>
                          <Text fw={600} c="dark">{c.title}</Text>
                          <Text size="xs" c="dimmed">Enviada el {c.date}</Text>
                        </Stack>
                        <Badge color={c.color} variant="light">{c.estado}</Badge>
                      </Group>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}

function LoginForm() {
  const [mode, setMode] = useState('login');

  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        backgroundColor: '#f6f7f8',
      }}
    >
      <Paper
        p={40}
        radius="xl"
        shadow="xl"
        style={{ width: '100%', maxWidth: 440, border: '1px solid #f3f4f6' }}
      >
        <Stack gap={24} align="center">
          <Box
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 48, height: 48, borderRadius: '50%',
              backgroundColor: 'rgba(26,60,94,0.1)', color: PRIMARY,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>apartment</span>
          </Box>

          <Title
            order={2}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#0f172a', textAlign: 'center' }}
          >
            {mode === 'login' ? 'Ingresá a tu cuenta' : 'Creá tu cuenta'}
          </Title>

          <SegmentedControl
            value={mode}
            onChange={setMode}
            data={[
              { label: 'Ingresar', value: 'login' },
              { label: 'Registrarme', value: 'register' },
            ]}
            fullWidth
            radius="md"
            styles={{
              indicator: { backgroundColor: PRIMARY },
              label: { fontWeight: 600 },
            }}
          />

          <Stack gap="md" w="100%">
            {mode === 'register' && (
              <Group gap="sm" grow>
                <TextInput placeholder="Nombre" autoComplete="given-name" variant="filled" radius="md" size="md" />
                <TextInput placeholder="Apellido" autoComplete="family-name" variant="filled" radius="md" size="md" />
              </Group>
            )}
            <TextInput type="email" placeholder="Correo electrónico" autoComplete="email" required variant="filled" radius="md" size="md" />
            <PasswordInput placeholder="Contraseña" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required variant="filled" radius="md" size="md" />
            {mode === 'register' && (
              <PasswordInput placeholder="Confirmar contraseña" autoComplete="new-password" required variant="filled" radius="md" size="md" />
            )}
          </Stack>

          {mode === 'login' && (
            <Group justify="space-between" w="100%">
              <Checkbox label="Recordarme" size="sm" />
              <Anchor href="#" style={{ fontSize: 14, color: PRIMARY, fontWeight: 500 }}>¿Olvidaste tu contraseña?</Anchor>
            </Group>
          )}

          {mode === 'register' && (
            <Box w="100%">
              <Checkbox size="sm" label={
                <Text size="sm">
                  Acepto los <Anchor href="#" style={{ color: PRIMARY, fontWeight: 500 }}>Términos y Condiciones</Anchor> y la <Anchor href="#" style={{ color: PRIMARY, fontWeight: 500 }}>Política de Privacidad</Anchor>
                </Text>
              } />
            </Box>
          )}

          <Button
            fullWidth radius="md" size="md"
            style={{ backgroundColor: PRIMARY, fontWeight: 600, boxShadow: '0 4px 14px rgba(26,60,94,0.25)' }}
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>{mode === 'login' ? 'lock' : 'person_add'}</span>}
          >
            {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </Button>

          <Divider label="O continuá con" labelPosition="center" w="100%" />

          <Group gap="md" w="100%">
            <Button variant="default" radius="md" style={{ flex: 1, fontWeight: 600 }}
              leftSection={
                <svg width={18} height={18} viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
              }
            >Google</Button>
            <Button variant="default" radius="md" style={{ flex: 1, fontWeight: 600 }}
              leftSection={
                <svg width={18} height={18} fill="#1877F2" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              }
            >Facebook</Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
}

// Simulación de sesión: cambiar a true para ver el dashboard
const IS_LOGGED_IN = true;

export default function Account() {
  return IS_LOGGED_IN ? <Dashboard /> : <LoginForm />;
}