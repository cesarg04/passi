# Configuración del Proyecto - Backend

## Requisitos
- Docker instalado y ejecutándose.
- Docker Compose.

## Pasos para configurar el proyecto

### 1. Iniciar los servicios con Docker Compose:
```bash
docker-compose up -d
```
Esto iniciará los servicios de PostgreSQL y Adminer.

### 2. Acceso a la Base de Datos:
Visita Adminer en [http://localhost:8080](http://localhost:8080) e ingresa estas credenciales:
- **Sistema**: PostgreSQL
- **Servidor**: postgres
- **Usuario**: myapp_user
- **Contraseña**: myapp_password
- **Base de datos**: myapp_db

### 3. Verificar conexión con Prisma:
```bash
npx prisma db push
```
Esto verificará y sincronizará el esquema de base de datos definido con Prisma.

### 4. Variables de Entorno:
El archivo `.env` ya está configurado con los detalles correctos de conexión.

## Comandos adicionales
- Para ver el estado de los servicios:
  ```bash
  docker-compose ps
  ```

- Para ver logs específicos de PostgreSQL:
  ```bash
  docker-compose logs postgres
  ```

- Para detener los servicios:
  ```bash
  docker-compose down
  ```

- Para reiniciar los servicios:
  ```bash
  docker-compose restart
  ```

¡Tu proyecto ahora está listo para ser usado con una base de datos PostgreSQL perfectamente configurada!
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
