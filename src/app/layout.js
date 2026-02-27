import '@mantine/core/styles.css';
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Altum Real Estate",
  description: "Propiedades de lujo en Argentina con seguridad y transparencia.",
};

const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#e8f0f8',
      '#c0d5e9',
      '#98badb',
      '#709fcc',
      '#4884bd',
      '#2e6699',
      '#1A3C5E',
      '#153149',
      '#0f2536',
      '#081830',
    ],
    gold: [
      '#fdf5e6',
      '#f9e5c0',
      '#f3d08d',
      '#ecba5a',
      '#e5a42c',
      '#d49520',
      '#C8923A',
      '#a67530',
      '#845c25',
      '#62421a',
    ],
  },
  fontFamily: "'DM Sans', sans-serif",
  headings: {
    fontFamily: "'Cormorant Garamond', serif",
  },
  defaultRadius: 'md',
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Header />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
