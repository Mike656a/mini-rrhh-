// src/services/api.ts
import axios from 'axios';
import { notifyGlobalError } from '../utils/errorHandler';
import { useAuthStore } from '../store/authStore';

// Por defecto, empleados usa JSON Server local; puede configurarse con VITE_API_URL.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});


// Interceptor: adjunta el token JWT a cada petición
apiClient.interceptors.request.use((config) => {
  // Leemos el store directamente (sin hook, para poder usarlo fuera de componentes)
  const authData = localStorage.getItem('auth-storage');
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed?.state?.user?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // Si el JSON es inválido, lo ignoramos y la petición sigue sin token
    }
  }
  return config;
});


// Interceptor: manejo global de errores de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    notifyGlobalError(error);
    if (error.response?.status === 401) {
      // Se invalidó el acceso: ProtectedRoute presenta el diseño 401.
      useAuthStore.getState().invalidateSession();
    }
    return Promise.reject(error);
  }
);