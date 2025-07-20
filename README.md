<div align="center">
  <h1>🛒 Dieguidev Shop</h1>
  <p><strong>Modern E-commerce App built with Next.js, TypeScript, Prisma, Tailwind CSS, Zustand, and Swiper.js</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15.4.2-blue?logo=nextdotjs" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38bdf8?logo=tailwindcss" />
    <img src="https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma" />
    <img src="https://img.shields.io/badge/Swiper.js-11.x-6332f6?logo=swiper" />
    <img src="https://img.shields.io/badge/Zustand-5.x-ffb300?logo=react" />
    <img src="https://img.shields.io/badge/License-MIT-green" />
  </p>
  <p>
    <a href="https://github.com/Dieguidev/next-dieguidev-shop">Repositorio en GitHub</a> ·
    <a href="#soporte">Soporte</a>
  </p>
</div>

---

## Descripción

Dieguidev Shop es una aplicación e-commerce moderna, desarrollada como parte de un curso avanzado de Next.js. Incluye gestión de productos, carrito, checkout, autenticación, integración con Prisma y una UI profesional y responsiva.

> **Stack:** Next.js 15, React 19, TypeScript 5, Prisma ORM, Tailwind CSS 4, Zustand, Swiper.js, ESLint, Prettier

## Características principales

- ⚡ **Next.js 15** con estructura de directorios `app/`
- 🛠️ **TypeScript** para tipado estricto y mantenibilidad
- 🎨 **Tailwind CSS** para estilos rápidos y responsivos
- 🗄️ **Prisma ORM** para modelado y acceso a base de datos relacional
- 🖼️ **next/image** para optimización de imágenes
- 🧩 **Zustand** para gestión global de estado (UI, carrito, sidebar)
- 🖱️ **Swiper.js** para slideshows de productos con thumbnails y autoplay
- 🛒 Carrito de compras y proceso de checkout
- 🔒 Autenticación y registro de usuarios
- 📦 Semilla de base de datos y estructura escalable
- 🧪 Buenas prácticas de commits y ramas

## Scripts disponibles

- `dev` — Inicia el servidor Next.js en modo desarrollo (`next dev --turbopack`)
- `build` — Compila la app para producción (`next build`)
- `start` — Inicia la app en modo producción (`next start`)
- `lint` — Linting con ESLint (`next lint`)
- `seed` — Ejecuta el script de semilla de base de datos (`ts-node src/seed/seed-database.ts`)

## Dependencias clave

- `next@15.4.2`, `react@19.1.0`, `typescript@^5`, `tailwindcss@^4`, `prisma`, `@prisma/client`, `zustand`, `swiper`, `clsx`, `react-icons`
- Dev: `eslint`, `eslint-config-next`, `@types/*`, `@tailwindcss/postcss`, `typescript`, `ts-node`

## Estructura del proyecto

```
├── .env.template         # Plantilla de variables de entorno
├── .gitignore            # Exclusiones de git
├── docker-compose.yml    # Configuración para entornos Docker/Postgres
├── eslint.config.mjs     # Configuración ESLint
├── next.config.ts        # Configuración Next.js
├── package.json          # Dependencias y scripts
├── postcss.config.mjs    # Configuración PostCSS
├── public/               # Recursos públicos (imgs, products)
├── src/
│   ├── app/              # Rutas y páginas Next.js
│   │   ├── (shop)/       # Secciones principales de la tienda
│   │   │   ├── admin/    # Panel de administración
│   │   │   ├── cart/     # Carrito de compras
│   │   │   ├── category/ # Categorías
│   │   │   ├── checkout/ # Checkout y dirección
│   │   │   ├── empty/    # Página de carrito vacío
│   │   │   ├── orders/   # Listado y detalle de órdenes
│   │   │   ├── product/  # Detalle de producto
│   │   │   ├── products/ # Listado de productos
│   │   │   └── ...
│   │   ├── auth/         # Login, registro, layout auth
│   │   └── layout.tsx    # Layout global
│   ├── components/       # Componentes reutilizables (UI, product, etc)
│   ├── config/           # Configuración de fuentes y utilidades
│   ├── interfaces/       # Tipos y contratos TypeScript
│   ├── seed/             # Datos iniciales y semilla (TypeScript, tsconfig propio)
│   ├── store/            # Estado global (Zustand)
│   └── ...
├── prisma/               # Esquema y migraciones Prisma
├── tsconfig.json         # Configuración TypeScript
└── README.md             # Este archivo
```

## Despliegue y entorno

- Incluye `docker-compose.yml` para levantar servicios como PostgreSQL fácilmente en desarrollo.
- Usa `.env.template` como base para tus variables de entorno.
- Recomendado: crear `.env` a partir de `.env.template` y personalizar según tu entorno.
- El directorio `prisma/` contiene el esquema y migraciones de base de datos.
- El directorio `src/seed/` contiene los datos iniciales y el script de semilla en TypeScript, con su propio `tsconfig.json`.

## Instalación y primeros pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Dieguidev/next-dieguidev-shop.git
   cd next-dieguidev-shop
   ```
2. **Configura las variables de entorno:**
   - Copia el archivo `.env.template` y renómbralo a `.env`:
     ```bash
     cp .env.template .env
     ```
   - Edita `.env` y coloca tu cadena de conexión de PostgreSQL en la variable `DATABASE_URL`.
3. **Levanta la base de datos con Docker (opcional pero recomendado):**
   - Si tienes Docker instalado, ejecuta:
     ```bash
     docker-compose up -d
     ```
   - Esto creará un contenedor de PostgreSQL accesible en `localhost:5432`.
4. **Instala las dependencias:**
   ```bash
   npm install
   ```
5. **Ejecuta las migraciones y la semilla de la base de datos:**
   ```bash
   npx prisma migrate dev
   npm run seed
   ```
6. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

> Si necesitas acceder a la base de datos visualmente, puedes usar Prisma Studio:
>
> ```bash
> npx prisma studio
> ```

## Recomendaciones adicionales

- Mantén tu entorno de desarrollo sincronizado con los archivos de ejemplo y configuración.
- Usa los scripts y configuraciones provistas para asegurar calidad y consistencia en el código.
- El panel de administración (`/admin`) está preparado para futuras extensiones.
- El store global (`src/store/`) facilita la escalabilidad y el manejo de estado avanzado.

---

## Soporte

¿Tienes dudas, sugerencias o encontraste un bug? Abre un issue en el [repositorio de GitHub](https://github.com/Dieguidev/next-dieguidev-shop/issues) o contacta a [Dieguidev](https://github.com/Dieguidev).

<div align="center">
  <strong>¡Gracias por visitar este proyecto! ⭐️</strong>
</div>
