# Guía Rápida: Frontend (Polo Demo App) 🎨

Esta es la cara visible de Polo. Es una aplicación **Next.js** que simula ser un cliente (como una tienda o un banco) que usa nuestra tecnología.

## 1. Instalación
Instala React, Next.js y todas las dependencias visuales:

```bash
npm install
```

## 2. Configuración (.env.local)
En el Frontend **NO guardamos secretos**. Todo lo que pongas aquí es visible para el usuario si sabe buscar. Por eso usamos credenciales "Anon" (Anónimas/Públicas).

1.  Crea un archivo `.env.local` (Next.js usa este nombre para ignorarlo en git):

```env
# Conexión Pública a Supabase (Para Login y leer datos públicos)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Conexión con nuestro Backend B2B
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

> **¿Por qué `NEXT_PUBLIC_`?**
> Next.js solo expone al navegador las variables que empiezan con este prefijo. Si pones una clave secreta sin el prefijo, el código del navegador no podrá leerla (lo cual es bueno, pero aquí solo necesitamos las públicas).

## 3. Ejecución
Para iniciar la página web en modo desarrollo:

```bash
npm run dev
```

Abre tu navegador en `http://localhost:3002` (o el puerto que te indique, a veces es 3000 si está libre).

## 4. Estructura Clave
*   `app/page.tsx`: Página de Login.
*   `app/dashboard/DashboardClient.tsx`: El panel principal donde ocurre la magia (Saldo, Envíos, Historial).
*   `lib/supabase/client.ts`: Configuración de conexión a la DB.
