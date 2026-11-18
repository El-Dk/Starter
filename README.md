# React + Express + TypeScript Starter

Monorepo con pnpm: React 19, Vite, Material UI, React Router, Express 5, TypeScript, Prisma ORM 7 y PostgreSQL.

## Requisitos

- Node.js 20.19+ (recomendado Node 22 LTS)
- pnpm 10+
- Docker Desktop o Docker Engine para levantar PostgreSQL localmente (también puedes usar cualquier PostgreSQL externo)

## Puesta en marcha

1. Instala dependencias y configura variables:

   ```bash
   pnpm install
   cp apps/api/.env.example apps/api/.env
   ```

2. Inicia PostgreSQL local:

   ```bash
   docker compose up -d postgres
   ```

3. Genera Prisma Client, crea la migración inicial y carga datos demo:

   ```bash
   pnpm --filter @app/api db:generate
   pnpm --filter @app/api db:migrate -- --name init
   pnpm --filter @app/api db:seed
   ```

4. Inicia frontend y API:

   ```bash
   pnpm dev
   ```

- Frontend: http://localhost:5173
- API: http://localhost:3001
- Health: http://localhost:3001/api/health
- Prisma Studio: `pnpm --filter @app/api db:studio`

Si ya tienes PostgreSQL, omite Docker y cambia `DATABASE_URL` en `apps/api/.env`.

## Usuarios demo

| Usuario | Contraseña | Acceso |
|---|---|---|
| admin@example.com | Admin123! | Rol admin |
| user@example.com | User123! | Rol user + permiso individual `reports:read` |

Las contraseñas del seed se guardan con bcrypt (coste 12). Cambia o elimina estas credenciales antes de desplegar.

## Arquitectura

```text
apps/
  web/       React, layout, navegación, rutas y auth context
  api/       Express organizado por capas
    prisma/  schema.prisma, migrations y seed
    src/
      modules/
        auth/       routes/controller/service/repository
        users/      routes/controller/service/repository
      lib/prisma.ts  cliente Prisma compartido
packages/
  shared/    Tipos y constantes compartidos
```

Flujo backend: `routes -> middleware -> controllers -> services -> repositories -> Prisma -> PostgreSQL`. Los servicios no acceden directamente a Prisma.

## Modelo híbrido de permisos

- `User`, `Role` y `Permission` son entidades independientes.
- `UserRole` relaciona usuarios y roles.
- `RolePermission` define permisos heredados por rol.
- `UserPermission` define excepciones individuales `GRANT` o `DENY`.
- Los permisos efectivos son la unión de permisos de roles y GRANT individuales, menos los DENY individuales. DENY prevalece.

El menú y las rutas del frontend usan los permisos devueltos por `/auth/me`; Express vuelve a comprobarlos en cada endpoint protegido.

## Comandos útiles

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm --filter @app/api db:generate
pnpm --filter @app/api db:migrate -- --name nombre_migracion
pnpm --filter @app/api db:deploy
pnpm --filter @app/api db:seed
pnpm --filter @app/api db:studio
docker compose down       # detener PostgreSQL
docker compose down -v    # borrar también los datos locales
```

`db:migrate` es para desarrollo; `db:deploy` aplica migraciones existentes en entornos desplegados. No ejecutes `docker compose down -v` si quieres conservar la base local.

## Notas de seguridad y producción

Este proyecto es una base de desarrollo, no está listo para producción. Antes de desplegar: usa un `JWT_SECRET` aleatorio y robusto; configura CORS por dominio; añade refresh tokens y cookies HttpOnly/Secure/SameSite o una estrategia equivalente; rate limiting y protección contra fuerza bruta; validación y autorización en cada endpoint; logs/auditoría; backups; y gestión de secretos. El token JWT actual es un access token de demostración.

## Prisma

Se fija Prisma ORM en la versión mayor 7 (`prisma` y `@prisma/client` con rango `^7.0.0`) para evitar instalar accidentalmente Prisma 8 mientras siga en release candidate. Prisma 7 requiere un driver adapter; este starter usa `@prisma/adapter-pg`. El cliente se genera en `src/generated/prisma` y no se versiona.
