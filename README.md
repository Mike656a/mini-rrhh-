# Mini RRHH — Gestión de personal

Aplicación de recursos humanos construida con **React, TypeScript, Vite, React Hook Form, Zustand y TanStack Query**.

## Requisitos

- Node.js compatible con Vite 8 (20.19+ o 22.12+)
- npm

## Configuración inicial

1. Instala las dependencias con `npm install`.
2. Copia `.env.example` como `.env` si necesitas cambiar las direcciones de las APIs.
3. En una terminal, ejecuta `npm run mock-api` para abrir la API de empleados en `http://localhost:3001`.
4. En otra terminal, ejecuta `npm run dev` y abre la dirección local que indique Vite.

Las dos terminales deben permanecer abiertas durante el desarrollo. Para generar los archivos de producción usa `npm run build`.

## Servicios utilizados

- **Empleados:** JSON Server local, con registros de demostración en `db.json`. La ruta es `/employees`.
- **Autenticación:** API del grupo configurada en `src/service/authApi.ts`. Puede cambiarse usando `VITE_AUTH_API_URL`.

Los empleados y sus correos en `db.json` son ficticios y sirven únicamente como información de ejemplo. El servidor JSON no sustituye una base de datos de producción y no implementa autenticación real.

## Manejo de accesos

La ruta `/401` tiene una pantalla independiente para las solicitudes sin autorización. Se muestra cuando el inicio de sesión responde con 401, o cuando se intenta visitar una sección protegida sin autorización. Incluye acceso para volver al formulario de inicio de sesión.

Los fallos de red y otros estados HTTP mantienen sus propios mensajes. La ruta `/404` es independiente.

## Comandos

| Comando | Función |
| --- | --- |
| `npm run dev` | Arrancar la aplicación React |
| `npm run mock-api` | Arrancar los empleados ficticios en el puerto 3001 |
| `npm run build` | Verificar TypeScript y construir para producción |
| `npm run lint` | Analizar la calidad del código |
| `npm run preview` | Previsualizar la compilación local |
