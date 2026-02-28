'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Button,
  Anchor,
  Divider,
} from '@mantine/core';

export default function Footer() {
  const pathname = usePathname();
  // Ocultamos el footer en la página de búsqueda para mantener la experiencia full-screen
  if (pathname === '/properties') return null;

  const navyBg = '#0f172a';

  return (
    <Box component="footer" style={{ backgroundColor: navyBg, color: 'white', paddingTop: 64, paddingBottom: 32 }}>
      <Container size={1280} px="md">
        {/* Newsletter */}
        <Box pb={48} mb={48} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Group justify="space-between" align="flex-start" wrap="wrap" gap={24}>
            <Box style={{ maxWidth: 520 }}>
              <Text
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700 }}
              >
                Suscribite a nuestro Newsletter
              </Text>
              <Text size="sm" c="gray.4" mt={8}>
                Recibí las últimas novedades del mercado inmobiliario y oportunidades exclusivas.
              </Text>
            </Box>
            <Group gap={8} style={{ width: '100%', maxWidth: 420 }}>
              <TextInput
                placeholder="Tu correo electrónico"
                type="email"
                style={{ flex: 1 }}
                styles={{
                  input: {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: 'white',
                    '::placeholder': { color: '#94a3b8' },
                  },
                }}
              />
              <Button
                style={{ backgroundColor: '#1A3C5E', fontWeight: 700 }}
                radius="md"
              >
                Enviar
              </Button>
            </Group>
          </Group>
        </Box>

        {/* Links Grid */}
        <Grid mb={48} gutter="xl">
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Text fw={700} c="gold.4" mb="md" style={{ color: '#C8923A' }}>Navegación</Text>
            <Stack gap={12}>
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Propiedades', href: '/properties' },
                { label: 'Emprendimientos', href: '/properties' },
              ].map(({ label, href }) => (
                <Anchor key={label} component={Link} href={href} underline="never" c="gray.4"
                  style={{ fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'white')}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  {label}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Text fw={700} mb="md" style={{ color: '#C8923A' }}>Empresa</Text>
            <Stack gap={12}>
              {['Nosotros', 'Contacto', 'Trabajá con nosotros', 'Blog'].map((item) => (
                <Anchor key={item} href="#" underline="never" c="gray.4"
                  style={{ fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'white')}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  {item}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Text fw={700} mb="md" style={{ color: '#C8923A' }}>Legal</Text>
            <Stack gap={12}>
              {['Términos y Condiciones', 'Política de Privacidad', 'Defensa del Consumidor'].map((item) => (
                <Anchor key={item} href="#" underline="never" c="gray.4"
                  style={{ fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={(e) => (e.target.style.color = 'white')}
                  onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
                >
                  {item}
                </Anchor>
              ))}
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Text fw={700} mb="md" style={{ color: '#C8923A' }}>Contacto</Text>
            <Stack gap={12}>
              <Group gap={8} align="flex-start">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }}>location_on</span>
                <Text size="sm" c="gray.4">Av. Aconquija 1200, Yerba Buena</Text>
              </Group>
              <Group gap={8} align="flex-start">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }}>call</span>
                <Text size="sm" c="gray.4">+54 381 412 3456</Text>
              </Group>
              <Group gap={8} align="flex-start">
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }}>mail</span>
                <Text size="sm" c="gray.4">info@altum.com.ar</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Bottom bar */}
        <Divider color="rgba(255,255,255,0.1)" mb={24} />
        <Group justify="space-between" align="center" wrap="wrap" gap={16}>
          <Text size="xs" c="gray.5">© 2024 Altum Real Estate. Todos los derechos reservados.</Text>
          <Group
            gap={8}
            style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: 6,
              padding: '4px 12px',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#9ca3af' }}>badge</span>
            <Text size="xs" c="gray.5">Matriculado C.C.I.T. N° 123</Text>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
