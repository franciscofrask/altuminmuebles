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
} from '@mantine/core';

const PRIMARY = '#1A3C5E';

export default function Account() {
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
          {/* Logo icon */}
          <Box
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 48, height: 48, borderRadius: '50%',
              backgroundColor: 'rgba(26,60,94,0.1)', color: PRIMARY,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>apartment</span>
          </Box>

          <Stack gap={8} align="center">
            <Title
              order={2}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: '#0f172a', textAlign: 'center' }}
            >
              Ingresá a tu cuenta
            </Title>
            <Text size="sm" c="dimmed" ta="center">
              O{' '}
              <Anchor href="#" style={{ color: PRIMARY, fontWeight: 500 }}>
                registrate si aún no tenés una
              </Anchor>
            </Text>
          </Stack>

          <Stack gap="md" w="100%">
            <TextInput
              id="email-address"
              type="email"
              placeholder="Correo electrónico"
              autoComplete="email"
              required
              variant="filled"
              radius="md"
              size="md"
            />
            <PasswordInput
              id="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              required
              variant="filled"
              radius="md"
              size="md"
            />
          </Stack>

          <Group justify="space-between" w="100%">
            <Checkbox label="Recordarme" size="sm" />
            <Anchor href="#" style={{ fontSize: 14, color: PRIMARY, fontWeight: 500 }}>
              ¿Olvidaste tu contraseña?
            </Anchor>
          </Group>

          <Button
            fullWidth
            radius="md"
            size="md"
            style={{
              backgroundColor: PRIMARY,
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(26,60,94,0.25)',
            }}
            leftSection={
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lock</span>
            }
          >
            Ingresar
          </Button>

          <Divider label="O continuá con" labelPosition="center" w="100%" />

          <Group gap="md" w="100%">
            <Button
              variant="default"
              radius="md"
              style={{ flex: 1, fontWeight: 600 }}
              leftSection={
                <svg width={18} height={18} viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
              }
            >
              Google
            </Button>
            <Button
              variant="default"
              radius="md"
              style={{ flex: 1, fontWeight: 600 }}
              leftSection={
                <svg width={18} height={18} fill="#1877F2" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              }
            >
              Facebook
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
}
