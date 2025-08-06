import { create } from "zustand";

type ThemeState = {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (mode: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeMode: "light",
  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === "dark" ? "light" : "dark",
    })),
  setTheme: (mode) => set({ themeMode: mode }),
}));