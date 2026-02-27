'use client';

import {
  AppShell,
  Burger,
  Group,
  Text,
  Title,
  Container,
  Paper,
  Button
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3}>Google AI Studio Clone</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text mb="sm" fw={500}>Navigation</Text>
        <Button variant="light" justify="left" fullWidth mb="xs">Prompts</Button>
        <Button variant="subtle" justify="left" fullWidth mb="xs">Library</Button>
        <Button variant="subtle" justify="left" fullWidth mb="xs">API key</Button>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg" py="xl">
          <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Title order={2} mb="md">Welcome to AI Studio</Title>
            <Text c="dimmed" mb="xl">
              This is a placeholder UI. Please provide the screenshot or specific details of the design you want replicated for the provided URL.
            </Text>

            <Group>
              <Button>Get Started</Button>
              <Button variant="default">Learn More</Button>
            </Group>
          </Paper>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
