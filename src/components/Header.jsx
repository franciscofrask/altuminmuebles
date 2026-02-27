'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Group,
  Button,
  Text,
  Container,
  Anchor,
  ActionIcon,
} from '@mantine/core';

const NAV_LINKS = [
  { label: 'Comprar', href: '/properties' },
  { label: 'Alquilar', href: '/properties' },
  { label: 'Tasaciones', href: '/appraisals' },
  { label: 'Emprendimientos', href: '/properties' },
];

export default function Header() {
  const pathname = usePathname();

  if (pathname === '/properties') return null;

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderBottom: '1px solid #e5e7eb',
        transition: 'all 0.3s',
      }}
    >
      <Container size={1280} h={80}>
        <Group h="100%" justify="space-between">
          {/* Logo */}
          <Anchor component={Link} href="/" underline="never">
            <Group gap={12} align="center">
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(26,60,94,0.1)',
                  color: '#1A3C5E',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>apartment</span>
              </Box>
              <Text
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#0f172a',
                  lineHeight: 1,
                }}
              >
                ALTUM
              </Text>
            </Group>
          </Anchor>

          {/* Nav links */}
          <Group gap={32} visibleFrom="md">
            {NAV_LINKS.map((link) => (
              <Anchor
                key={link.label}
                component={Link}
                href={link.href}
                underline="never"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#334155',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#1A3C5E')}
                onMouseLeave={(e) => (e.target.style.color = '#334155')}
              >
                {link.label}
              </Anchor>
            ))}
          </Group>

          {/* Actions */}
          <Group gap={12}>
            <Button
              variant="light"
              color="gray"
              size="sm"
              radius="md"
              style={{ fontWeight: 700 }}
            >
              USD / ARS
            </Button>
            <Button
              component={Link}
              href="/account"
              size="sm"
              radius="md"
              style={{
                backgroundColor: '#1A3C5E',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(26,60,94,0.25)',
              }}
            >
              Ingresar
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
