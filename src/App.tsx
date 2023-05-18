import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Notifications, notifications } from "@mantine/notifications";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Index from "./Index";

import { ErrorResponse } from "./api/models/ErrorResponse";
import DependencyProvider from "./components/DependencyProvider";
import "./reset.css";
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      notifications.show({
        title: "Error",
        message:
          "message" in (error as ErrorResponse)
            ? (error as ErrorResponse).message
            : "Something went worng",
        color: "red",
      }),
  }),
});

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <DependencyProvider>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
          >
            <Notifications />
            <Index />
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </DependencyProvider>
  );
}

export default App;
