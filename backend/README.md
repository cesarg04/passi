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

## WebSocket para Tiempo Real

Las tareas se actualizan en tiempo real usando WebSocket. Los eventos se emiten automáticamente cuando:
- Se crea una tarea
- Se actualiza una tarea  
- Se elimina una tarea

### Conexión WebSocket:
- **Namespace**: `/tasks`
- **URL**: `ws://localhost:3000/tasks`
- **Autenticación**: JWT Token requerido

### Eventos disponibles:
- `task:created` - Nueva tarea creada
- `task:updated` - Tarea actualizada
- `task:deleted` - Tarea eliminada

### Ejemplo de uso:
Abre el archivo `websocket-client-example.html` en tu navegador para probar la conexión WebSocket.

### Para frontend (JavaScript):
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000/tasks', {
  auth: {
    token: 'tu-jwt-token-aqui'
  }
});

socket.on('task:created', (task) => {
  console.log('Nueva tarea:', task);
});

socket.on('task:updated', (task) => {
  console.log('Tarea actualizada:', task);
});

socket.on('task:deleted', (data) => {
  console.log('Tarea eliminada:', data.id);
});
```