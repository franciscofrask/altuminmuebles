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
  Select,
} from '@mantine/core';

const PRIMARY = '#1A3C5E';
const SECONDARY = '#C8923A';

const FEATURES = [
  {
    icon: 'analytics',
    title: 'Análisis de Mercado',
    desc: 'Comparamos tu propiedad con opciones similares en la zona para asegurar un precio competitivo.',
  },
  {
    icon: 'speed',
    title: 'Respuesta Rápida',
    desc: 'Recibí tu tasación en menos de 48 horas hábiles luego de nuestra visita.',
  },
  {
    icon: 'verified',
    title: 'Respaldo Profesional',
    desc: 'Tasaciones firmadas por corredores inmobiliarios matriculados (C.C.I.T.).',
  },
];

export default function Appraisals() {
  return (
    <Container size={1280} px={{ base: 16, md: 40 }} py={{ base: 48, lg: 80 }}>
      <Grid gutter={{ base: 48, lg: 80 }} align="center">
        {/* Left column: content */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack gap={32}>
            {/* Badge */}
            <Group
              gap={8}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'rgba(26,60,94,0.1)',
                borderRadius: 999,
                padding: '8px 16px',
                width: 'fit-content',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: PRIMARY }}>real_estate_agent</span>
              <Text size="sm" fw={700} style={{ color: PRIMARY }}>Tasaciones Profesionales</Text>
            </Group>

            <Title
              order={1}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700, color: '#0f172a', lineHeight: 1.2,
              }}
            >
              Conocé el valor real de tu propiedad
            </Title>

            <Text size="lg" c="dimmed" lh={1.7}>
              Nuestro equipo de expertos matriculados realiza un análisis exhaustivo del mercado para determinar el precio justo y competitivo de tu inmueble.
            </Text>

            <Stack gap="xl">
              {FEATURES.map((feat) => (
                <Group key={feat.title} gap="md" align="flex-start">
                  <Box
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                      backgroundColor: 'rgba(200,146,58,0.1)', color: SECONDARY,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{feat.icon}</span>
                  </Box>
                  <Stack gap={4}>
                    <Text fw={700} c="dark">{feat.title}</Text>
                    <Text size="sm" c="dimmed" lh={1.6}>{feat.desc}</Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Stack>
        </Grid.Col>

        {/* Right column: form */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Box style={{ position: 'relative' }}>
            {/* Glow effect */}
            <Box
              style={{
                position: 'absolute', inset: -16,
                borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(26,60,94,0.05), rgba(200,146,58,0.05))',
                filter: 'blur(20px)',
              }}
            />
            <Paper
              p={{ base: 'xl', sm: 40 }}
              radius="xl"
              shadow="xl"
              style={{ position: 'relative', border: '1px solid #f3f4f6' }}
            >
              <Title order={2} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: '#0f172a', marginBottom: 24 }}>
                Solicitar Tasación
              </Title>

              <Stack gap="lg">
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Nombre" placeholder="Tu nombre" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Apellido" placeholder="Tu apellido" variant="filled" radius="md" />
                  </Grid.Col>
                </Grid>

                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Teléfono" type="tel" placeholder="Ej: 381 123 4567" variant="filled" radius="md" />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput label="Email" type="email" placeholder="tu@email.com" variant="filled" radius="md" />
                  </Grid.Col>
                </Grid>

                <Select
                  label="Tipo de Propiedad"
                  placeholder="Seleccionar..."
                  data={[
                    { value: 'casa', label: 'Casa' },
                    { value: 'departamento', label: 'Departamento' },
                    { value: 'terreno', label: 'Terreno' },
                    { value: 'oficina', label: 'Oficina / Local' },
                  ]}
                  variant="filled"
                  radius="md"
                />

                <TextInput
                  label="Ubicación de la Propiedad"
                  placeholder="Dirección, Barrio, Ciudad"
                  variant="filled"
                  radius="md"
                />

                <Textarea
                  label="Comentarios adicionales"
                  placeholder="Detalles que consideres importantes (estado, refacciones, etc.)"
                  rows={4}
                  variant="filled"
                  radius="md"
                />

                <Button
                  fullWidth
                  size="lg"
                  radius="md"
                  style={{
                    backgroundColor: PRIMARY,
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(26,60,94,0.25)',
                  }}
                >
                  Enviar Solicitud
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
