// src/store/authStore.ts
import { create } from 'zustand';
import { isAxiosError } from 'axios';
import { persist } from 'zustand/middleware';
import type { AuthUser, LoginCredentials } from '../types';
import toast from 'react-hot-toast';
import { authService } from '../service/authService';
import { extractErrorMessage } from '../utils/errorHandler';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  errorStatus: number | null;
  sessionExpired: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  invalidateSession: () => void;
  refreshSession: () => Promise<string | null>;  
}
let refreshInFlight: Promise<string | null> | null = null;


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      errorStatus: null,
      sessionExpired: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null, errorStatus: null, sessionExpired: false });

        try {
          const user = await authService.login(credentials);
          set({ user, isAuthenticated: true, isLoading: false, sessionExpired: false });
          toast.success(`Bienvenido, ${user.firstName} 👋`);
        } catch (err: unknown) {
          // Mensaje en español según error.code (INVALID CREDENTIALS, red caída...)
          set({ error: extractErrorMessage(err), errorStatus: isAxiosError(err) ? err.response?.status ?? null : null, isLoading: false });
        }
      },

      logout: async () => {
        const refreshToken = get().user?.refreshToken;

        if (refreshToken) {
          await authService.logout(refreshToken);
          toast.success('Sesión cerrada correctamente.');
        }

        set({ user: null, isAuthenticated: false, error: null, errorStatus: null, sessionExpired: false });
      },

      clearError: () => set({ error: null, errorStatus: null }),

      invalidateSession: () => set({ user: null, isAuthenticated: false, error: null, errorStatus: null, sessionExpired: true }),

      refreshSession: async () => {
        const refreshToken = get().user?.refreshToken;

        if (refreshInFlight) return refreshInFlight;
        if (!refreshToken) {
          get().invalidateSession();
          return null;
        }

        refreshInFlight = authService
          .refresh(refreshToken)
          .then((user) => {
            set({ user, isAuthenticated: true, sessionExpired: false });
            return user.accessToken;
          })
          .catch(() => {
            get().invalidateSession();
            toast.error('Tu sesión ha expirado. Inicia sesión de nuevo.');
            return null;
          })
          .finally(() => {
            refreshInFlight = null;
          });

        return refreshInFlight;
      },
    }),
    {
      name: 'auth-storage',
      // Solo persistir user e isAuthenticated (no isLoading ni error)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);