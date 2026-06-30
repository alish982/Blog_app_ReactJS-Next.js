import { create } from "zustand";
import type { User } from "@/types";
import { getStorageItem, removeStorageItem, setStorageItem } from "@/utils/storage";

const AUTH_STORAGE_KEY = "blog-platform-auth";

interface PersistedAuth {
  user: User;
  token: string;
}

interface AuthStoreState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  /** True until the persisted session has been read from localStorage. */
  isInitializing: boolean;
  hydrate: () => void;
  setSession: (user: User, token: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitializing: true,

  hydrate: () => {
    const persisted = getStorageItem<PersistedAuth>(AUTH_STORAGE_KEY);
    if (persisted?.user && persisted?.token) {
      set({
        user: persisted.user,
        token: persisted.token,
        isAuthenticated: true,
        isInitializing: false,
      });
    } else {
      set({ isInitializing: false });
    }
  },

  setSession: (user, token) => {
    setStorageItem<PersistedAuth>(AUTH_STORAGE_KEY, { user, token });
    set({ user, token, isAuthenticated: true });
  },

  clearSession: () => {
    removeStorageItem(AUTH_STORAGE_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
