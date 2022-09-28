import { BrowserRouter } from 'react-router-dom';
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

interface AppProviderProps {
  children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: 'Inter, sans-serif',
          fontFamilyMonospace: 'JetBrains Mono, monospace',
          headings: {
            fontFamily: 'Inter, sans-serif',
          },
        }}
      >
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
