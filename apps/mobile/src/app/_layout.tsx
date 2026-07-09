import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: "ios_from_left",
            }}
          />

          <Stack.Screen
            name="post/new-post"
            options={{
              headerShown: false,
              presentation: "modal",
              animationDuration: 300,
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
