'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  NumberInput,
  Radio,
  Checkbox,
  ActionIcon,
  Anchor,
  Divider,
  Badge,
} from '@mantine/core';
import { PROPERTIES } from '@/data/properties';

export default function Properties() {
  return (
    <Box style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', alignItems: 'flex-start' }}>
      {/* Sidebar */}
      <Box
        component="aside"
        visibleFrom="md"
        style={{
          width: 300,
          flexShrink: 0,
          borderRight: '1px solid #e5e7eb',
          backgroundColor: 'white',
          padding: 24,
          overflowY: 'auto',
          height: 'calc(100vh - 80px)',
          position: 'sticky',
          top: 80,
        }}
      >
        <Group justify="space-between" mb="lg">
          <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24 }}>
            Filtros
          </Title>
          <Anchor style={{ fontSize: 14, fontWeight: 500, color: PRIMARY }}>Limpiar</Anchor>
        </Group>

        <Stack gap="xl">
          {/* Operación */}
          <Box>
            <Text fw={700} size="sm" mb="sm">Operación</Text>
            <Stack gap="xs">
              <Radio
                label="Venta"
                name="operation"
                checked={operation === 'Venta'}
                onChange={() => setOperation('Venta')}
                styles={{ radio: { borderColor: PRIMARY } }}
              />
              <Radio
                label="Alquiler"
                name="operation"
                checked={operation === 'Alquiler'}
                onChange={() => setOperation('Alquiler')}
                styles={{ radio: { borderColor: PRIMARY } }}
              />
            </Stack>
          </Box>

          <Divider />

          {/* Tipo de propiedad */}
          <Box>
            <Text fw={700} size="sm" mb="sm">Tipo de Propiedad</Text>
            <Stack gap="xs">
              <Checkbox label="Casa" defaultChecked
                styles={{ input: { borderColor: PRIMARY, '&:checked': { backgroundColor: PRIMARY } } }}
              />
              <Checkbox label="Departamento"
                styles={{ input: { borderColor: PRIMARY } }}
              />
              <Checkbox label="Terreno"
                styles={{ input: { borderColor: PRIMARY } }}
              />
            </Stack>
          </Box>

          <Divider />

          {/* Precio */}
          <Box>
            <Text fw={700} size="sm" mb="sm">Precio (USD)</Text>
            <Group gap="sm">
              <NumberInput placeholder="Mín" variant="filled" radius="md" style={{ flex: 1 }} />
              <Text c="dimmed">-</Text>
              <NumberInput placeholder="Máx" variant="filled" radius="md" style={{ flex: 1 }} />
            </Group>
          </Box>

          <Divider />

          {/* Dormitorios */}
          <Box>
            <Text fw={700} size="sm" mb="sm">Dormitorios</Text>
            <Group gap="xs">
              {[1, 2, 3, '4+'].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="xs"
                  radius="md"
                  style={{ flex: 1, borderColor: '#e5e7eb', color: '#334155' }}
                >
                  {num}
                </Button>
              ))}
            </Group>
          </Box>

          <Button
            fullWidth
            radius="md"
            style={{ backgroundColor: PRIMARY, fontWeight: 700 }}
          >
            Aplicar Filtros
          </Button>
        </Stack>
      </Box>

      {/* Main content */}
      <Box style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        <Box style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <Group justify="space-between" align="flex-end" mb="xl" wrap="wrap" gap="md">
            <Stack gap={4}>
              <Title order={1} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: '#0f172a' }}>
                Propiedades en {operation}
              </Title>
              <Text size="sm" c="dimmed">{filtered.length} resultados en toda Argentina</Text>
            </Stack>
            <Group gap="md">
              <Button
                variant="outline"
                radius="md"
                size="sm"
                hiddenFrom="md"
                leftSection={<span className="material-symbols-outlined" style={{ fontSize: 18 }}>tune</span>}
                style={{ borderColor: '#e5e7eb', color: '#334155' }}
              >
                Filtros
              </Button>
              <Select
                data={['Más recientes', 'Menor precio', 'Mayor precio']}
                value={sort}
                onChange={setSort}
                size="sm"
                radius="md"
                style={{ width: 160 }}
              />
            </Group>
          </Group>

          {/* Property Grid */}
          <Grid gutter="lg">
            {filtered.map((prop) => (
              <Grid.Col key={prop.id} span={{ base: 12, sm: 6, xl: 4 }}>
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
                    transition: 'box-shadow 0.2s',
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
                    {prop.featured && (
                      <Badge
                        size="xs"
                        style={{ position: 'absolute', top: 12, left: prop.operation.length * 8 + 32, zIndex: 1, backgroundColor: '#f59e0b', color: 'white' }}
                        radius="sm"
                      >
                        Destacado
                      </Badge>
                    )}
                    <Box
                      style={{
                        width: '100%', height: '100%',
                        backgroundImage: `url('${prop.img}')`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }}
                    />
                    <ActionIcon
                      variant="white" size="sm" radius="xl" color="gray"
                      style={{ position: 'absolute', bottom: 12, right: 12 }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
                    </ActionIcon>
                  </Box>
                  <Box p="md">
                    <Badge size="xs" variant="light" color="gray" radius="sm" mb={6}>{prop.type}</Badge>
                    <Text fw={700} size="md" c="dark" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {prop.title}
                    </Text>
                    <Group gap={4} mt={4}>
                      <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#6b7280' }}>location_on</span>
                      <Text size="sm" c="dimmed" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {prop.location}
                      </Text>
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
              </Grid.Col>
            ))}
          </Grid>

          {/* Pagination */}
          <Group justify="center" gap="xs" mt={48}>
            <ActionIcon variant="outline" radius="md" size="lg" style={{ borderColor: '#e5e7eb' }}>
              <span className="material-symbols-outlined">chevron_left</span>
            </ActionIcon>
            {[1, 2, 3].map((page) => (
              <ActionIcon
                key={page}
                variant={page === 1 ? 'filled' : 'outline'}
                radius="md" size="lg"
                style={{
                  backgroundColor: page === 1 ? PRIMARY : 'transparent',
                  borderColor: '#e5e7eb',
                  color: page === 1 ? 'white' : '#334155',
                  fontWeight: 500,
                }}
              >
                {page}
              </ActionIcon>
            ))}
            <Text c="dimmed">...</Text>
            <ActionIcon variant="outline" radius="md" size="lg" style={{ borderColor: '#e5e7eb' }}>
              <span className="material-symbols-outlined">chevron_right</span>
            </ActionIcon>
          </Group>
        </Box>
      </Box>
    </Box>
  );
}