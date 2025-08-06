import { useColorScheme } from "react-native";
import { DarkTheme, Lighttheme } from "../theme/theme";

export const useCustomTheme = () => {
  const colorScheme = useColorScheme();

  return colorScheme === "dark" ? DarkTheme : Lighttheme;
};

