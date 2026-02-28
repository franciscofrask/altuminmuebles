'use client';

import Link from 'next/link';
import { Box, Container, Stack, Title, Text, Button, Group } from '@mantine/core';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

export default function NotFound() {
  return (
    <Box
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e8f0f8 100%)',
      }}
    >
      <Container size="sm">
        <Stack align="center" gap={32} style={{ textAlign: 'center' }}>
          {/* Icon */}
          <Box
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 96, height: 96, borderRadius: '50%',
              backgroundColor: 'rgba(26,60,94,0.08)', color: PRIMARY,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 52 }}>home_search</span>
          </Box>

          {/* 404 number */}
          <Text
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(5rem, 15vw, 8rem)',
              fontWeight: 700,
              color: SECONDARY,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            404
          </Text>

          <Stack gap={12} align="center">
            <Title
              order={1}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                color: '#0f172a',
              }}
            >
              Esta propiedad no existe
            </Title>
            <Text size="lg" c="dimmed" style={{ maxWidth: 400 }}>
              La página que buscás no fue encontrada. Puede que haya sido eliminada o que la URL sea incorrecta.
            </Text>
          </Stack>

          <Group gap="md" justify="center">
            <Button
              component={Link}
              href="/"
              size="md"
              radius="md"
              style={{ backgroundColor: PRIMARY, fontWeight: 700, boxShadow: '0 4px 14px rgba(26,60,94,0.25)' }}
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>home</span>}
            >
              Volver al inicio
            </Button>
            <Button
              component={Link}
              href="/properties"
              size="md"
              radius="md"
              variant="outline"
              style={{ borderColor: PRIMARY, color: PRIMARY, fontWeight: 700 }}
              leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>search</span>}
            >
              Ver propiedades
            </Button>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
