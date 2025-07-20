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

## Dependencias clave

- `next@15.4.2`, `react@19.1.0`, `typescript@^5`, `tailwindcss@^4`, `prisma`, `@prisma/client`, `zustand`, `swiper`, `clsx`, `react-icons`
- Dev: `eslint`, `eslint-config-next`, `@types/*`, `@tailwindcss/postcss`, `typescript`

## Estructura del proyecto

```
├── public/
│   ├── imgs/           # Imágenes generales
│   └── products/       # Imágenes de productos
├── src/
│   ├── app/            # Rutas y páginas Next.js
│   │   ├── (shop)/     # Secciones principales de la tienda
│   │   ├── auth/       # Login, registro, layout auth
│   │   ├── cart/       # Carrito de compras
│   │   ├── checkout/   # Checkout y dirección
│   │   ├── orders/     # Listado y detalle de órdenes
│   │   └── ...
│   ├── components/     # Componentes reutilizables (UI, product, etc)
│   ├── interfaces/     # Tipos y contratos TypeScript
│   ├── seed/           # Datos iniciales y semilla
│   └── ...
├── prisma/             # Esquema y migraciones Prisma
├── package.json        # Dependencias y scripts
├── tailwind.config.js  # Configuración Tailwind
├── tsconfig.json       # Configuración TypeScript
└── README.md           # Este archivo
```

## Instalación y uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Dieguidev/next-dieguidev-shop.git
   cd next-dieguidev-shop
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   ```
3. **Configura la base de datos:**
   - Crea un archivo `.env` con tu cadena de conexión a PostgreSQL.
   - Ejecuta las migraciones y la semilla:
     ```bash
     npx prisma migrate dev
     npx prisma db seed
     ```
4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Buenas prácticas

- Commits profesionales y descriptivos (en inglés)
- Uso de ramas por feature: `feature/nombre-descriptivo`
- Código tipado y modular
- UI responsiva y accesible
- Imágenes optimizadas con next/image
- Linting y formateo automático

## Créditos y recursos

- Autor: [Dieguidev](https://github.com/Dieguidev)
- Tailwind Components, Swiper.js, Prisma ORM, Zustand

---

## Soporte

¿Tienes dudas, sugerencias o encontraste un bug? Abre un issue en el [repositorio de GitHub](https://github.com/Dieguidev/next-dieguidev-shop/issues) o contacta a [Dieguidev](https://github.com/Dieguidev).

<div align="center">
  <strong>¡Gracias por visitar este proyecto! ⭐️</strong>
</div>
