import { useColorScheme } from "@/hooks/useColorScheme";
import "@/shared/components/sheets/Sheets";
import { useThemeStore } from "@/shared/store/theme/ThemeStore";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SheetProvider } from "react-native-actions-sheet";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

dayjs.locale("es");

export default function RootLayout() {
  const queryClient = new QueryClient();
  const systemColorScheme = useColorScheme();
  const { themeMode, setTheme } = useThemeStore();

  // Inicializar con el tema del sistema
  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [setTheme, systemColorScheme]);

  const navigationTheme = themeMode === "dark" ? DarkTheme : DefaultTheme;

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ThemeProvider value={navigationTheme}>
          <SheetProvider>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </SheetProvider>
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}