
# 🎟️ CineApp - Frontend en React + TypeScript + TailwindCSS

Aplicación web para reservar entradas de cine, desarrollada con **React 19**, **TypeScript**, **Vite** y **TailwindCSS**. Interactúa con una API en .NET y proporciona funcionalidades de visualización de cartelera, selección de butacas, y gestión administrativa.

---

## 🚀 Tecnologías utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 📦 Scripts disponibles

Desde el directorio raíz, puedes ejecutar:

```bash
npm install         # Instala todas las dependencias
npm run dev         # Inicia el servidor de desarrollo en http://localhost:5173
npm run build       # Compila el proyecto para producción
npm run preview     # Ejecuta la versión de producción localmente
npm run lint        # Ejecuta ESLint para verificar errores de código
```

---

## 🧱 Estructura del proyecto

```
src/
├── App.tsx                  # Rutas principales de la app
├── main.tsx                 # Punto de entrada
├── Context/                 # Contexto global (reservas)
├── Paginas/                 # Vistas principales (Home, Cartelera, Admin, etc.)
├── Componentes/             # Componentes reutilizables
├── Servicios/               # Servicios para llamadas a la API
├── Types/                   # Tipos y modelos TypeScript
├── index.css                # Estilos generales (Tailwind)
```

---

## ⚙️ TailwindCSS

TailwindCSS está integrado con el plugin oficial para Vite. Se configura automáticamente desde `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```
---

## 🌐 Comunicación con backend

El frontend espera una API corriendo en:

```
http://localhost:5084
```

---

## 🧪 Rutas principales

- `/` — Página de inicio
- `/cartelera` — Ver películas en cartelera
- `/reservar/:id` — Reservar asiento para una función
- `/reservas` — Ver reservas realizadas
- `/admin` — Panel de administración
- `/admin/butacas` — Administrar butacas
- `/admin/cartelera` — Administrar cartelera
- `/admin/reservas` — Ver reservas

---

## 🛠️ Requisitos previos

- Node.js 18 o superior
- npm 9+