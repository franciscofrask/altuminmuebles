'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  Group,
  Button,
  Text,
  Container,
  Anchor,
  Burger,
  Drawer,
  Stack,
  Divider,
  TextInput,
  ActionIcon,
} from '@mantine/core';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const NAV_LINKS = [
  { label: 'Propiedades', href: '/properties' },
  { label: 'Tasaciones', href: '/appraisals' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [city, setCity] = useState('');
  const [mobileCity, setMobileCity] = useState('');

  function handleSearch(e) {
    e?.preventDefault();
    const q = city.trim();
    if (!q) return;
    router.push(`/search?city=${encodeURIComponent(q)}`);
    setCity('');
  }

  function handleMobileSearch(e) {
    e?.preventDefault();
    const q = mobileCity.trim();
    if (!q) return;
    setOpened(false);
    router.push(`/search?city=${encodeURIComponent(q)}`);
    setMobileCity('');
  }

  return (
    <>
      <Box
        component="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Container size={1280} h={80} px={{ base: 16, md: 24 }}>
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
                    color: PRIMARY,
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

            {/* Desktop nav */}
            <Group gap={32} visibleFrom="md">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Anchor
                    key={link.label}
                    component={Link}
                    href={link.href}
                    underline="never"
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? PRIMARY : '#334155',
                      borderBottom: `2px solid ${isActive ? SECONDARY : 'transparent'}`,
                      paddingBottom: 4,
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = PRIMARY)}
                    onMouseLeave={(e) => (e.target.style.color = isActive ? PRIMARY : '#334155')}
                  >
                    {link.label}
                  </Anchor>
                );
              })}
            </Group>

            {/* City search — desktop */}
            <Box
              component="form"
              onSubmit={handleSearch}
              visibleFrom="md"
              style={{ flex: 1, maxWidth: 280, margin: '0 24px' }}
            >
              <TextInput
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Buscar ciudad…"
                radius="xl"
                size="sm"
                leftSection={
                  <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#9ca3af' }}>search</span>
                }
                rightSection={
                  city.trim() ? (
                    <ActionIcon
                      type="submit"
                      size="sm"
                      radius="xl"
                      style={{ backgroundColor: PRIMARY, color: 'white' }}
                      variant="filled"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </ActionIcon>
                  ) : null
                }
                styles={{
                  input: {
                    border: '1.5px solid #e5e7eb',
                    fontSize: 13,
                    backgroundColor: '#f8fafc',
                    '&:focus': { borderColor: PRIMARY },
                  },
                }}
              />
            </Box>

            {/* Actions */}
            <Group gap={12}>
              <Button
                variant="light"
                color="gray"
                size="sm"
                radius="md"
                style={{ fontWeight: 700 }}
                visibleFrom="sm"
              >
                USD / ARS
              </Button>
              <Button
                component={Link}
                href="/account"
                size="sm"
                radius="md"
                visibleFrom="sm"
                leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>}
                style={{
                  backgroundColor: PRIMARY,
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(26,60,94,0.25)',
                }}
              >
                Mi Cuenta
              </Button>
              {/* Hamburger — solo mobile */}
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                hiddenFrom="md"
                size="sm"
                color={PRIMARY}
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="xs"
        padding="xl"
        zIndex={1100}
        title={
          <Text style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: '#0f172a' }}>
            ALTUM
          </Text>
        }
      >
        {/* Mobile city search */}
        <Box component="form" onSubmit={handleMobileSearch} mb="lg">
          <TextInput
            value={mobileCity}
            onChange={(e) => setMobileCity(e.target.value)}
            placeholder="Buscar por ciudad…"
            radius="xl"
            size="sm"
            leftSection={
              <span className="material-symbols-outlined" style={{ fontSize: 17, color: '#9ca3af' }}>search</span>
            }
            rightSection={
              mobileCity.trim() ? (
                <ActionIcon
                  type="submit"
                  size="sm"
                  radius="xl"
                  variant="filled"
                  style={{ backgroundColor: PRIMARY, color: 'white' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                </ActionIcon>
              ) : null
            }
            styles={{ input: { border: '1.5px solid #e5e7eb', backgroundColor: '#f8fafc' } }}
          />
        </Box>

        <Stack gap={0}>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Anchor
                key={link.label}
                component={Link}
                href={link.href}
                underline="never"
                onClick={() => setOpened(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: 16,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? PRIMARY : '#334155',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                {link.label}
              </Anchor>
            );
          })}
        </Stack>
        <Divider my="xl" />
        <Stack gap="sm">
          <Button
            component={Link}
            href="/account"
            fullWidth
            radius="md"
            onClick={() => setOpened(false)}
            leftSection={<span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>}
            style={{ backgroundColor: PRIMARY, fontWeight: 700 }}
          >
            Mi Cuenta
          </Button>
          <Button
            variant="light"
            color="gray"
            fullWidth
            radius="md"
            style={{ fontWeight: 700 }}
          >
            USD / ARS
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
