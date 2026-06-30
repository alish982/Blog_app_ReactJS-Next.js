import { create } from "zustand";
import { getStorageItem, setStorageItem } from "@/utils/storage";

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "blog-platform-theme";

interface ThemeStoreState {
  theme: Theme;
  /** True until the persisted theme has been read from localStorage. */
  isInitializing: boolean;
  hydrate: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
  theme: "light",
  isInitializing: true,

  hydrate: () => {
    const persisted = getStorageItem<Theme>(THEME_STORAGE_KEY);
    const theme: Theme = persisted === "dark" ? "dark" : "light";
    applyThemeClass(theme);
    set({ theme, isInitializing: false });
  },

  setTheme: (theme) => {
    setStorageItem<Theme>(THEME_STORAGE_KEY, theme);
    applyThemeClass(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const next: Theme = get().theme === "light" ? "dark" : "light";
    get().setTheme(next);
  },
}));
