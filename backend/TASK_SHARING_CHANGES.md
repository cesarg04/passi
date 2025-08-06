# Cambios en el Sistema de Tareas - Compartición con Restricciones

## Resumen de Cambios

Se han implementado las siguientes funcionalidades:

1. **Tareas compartidas**: Todos los usuarios autenticados pueden ver todas las tareas
2. **Información del usuario**: Cada tarea incluye información del propietario (email, nombre)
3. **Restricciones de edición**: Solo el propietario puede editar o eliminar sus tareas
4. **Serialización de emails**: Automática conversión a minúsculas

## Nuevos Endpoints

### GET /api/tasks
- **Descripción**: Obtiene todas las tareas de todos los usuarios
- **Autenticación**: Requerida (JWT)
- **Respuesta**: Array de tareas con información del usuario propietario
- **Ejemplo de respuesta**:
```json
[
  {
    "id": 1,
    "title": "Mi tarea",
    "description": "Descripción de la tarea",
    "completed": false,
    "priority": "MEDIUM",
    "dueDate": "2025-08-30T00:00:00.000Z",
    "userId": 1,
    "user": {
      "id": 1,
      "email": "usuario@ejemplo.com",
      "name": "Juan Pérez"
    },
    "createdAt": "2025-08-06T01:00:00.000Z",
    "updatedAt": "2025-08-06T01:00:00.000Z"
  }
]
```

### GET /api/tasks/my-tasks
- **Descripción**: Obtiene solo las tareas del usuario autenticado
- **Autenticación**: Requerida (JWT)
- **Respuesta**: Array de tareas del usuario actual

### PUT /api/tasks/:id
- **Descripción**: Actualiza una tarea (solo el propietario)
- **Autenticación**: Requerida (JWT)
- **Validación**: Solo el propietario puede editar
- **Respuestas**:
  - 200: Tarea actualizada exitosamente
  - 403: Sin permisos para esta tarea
  - 404: Tarea no encontrada

### DELETE /api/tasks/:id
- **Descripción**: Elimina una tarea (solo el propietario)
- **Autenticación**: Requerida (JWT)
- **Validación**: Solo el propietario puede eliminar
- **Respuestas**:
  - 200: Tarea eliminada exitosamente
  - 403: Sin permisos para esta tarea
  - 404: Tarea no encontrada

## Nuevos Componentes Implementados

### Guards
- **TaskOwnerGuard**: Verifica que solo el propietario pueda editar/eliminar tareas

### Use Cases
- **GetTasksUseCase**: Actualizado para obtener todas las tareas con información del usuario
- **GetUserTasksUseCase**: Nuevo caso de uso para obtener tareas del usuario específico

### Repository
- **findAllWithUsers()**: Nuevo método que trae todas las tareas con información del usuario

### DTOs
- **TaskResponseDto**: Actualizado para incluir información del usuario propietario

## Serialización de Emails

Se implementaron herramientas para la serialización automática de emails:

### Decorator @EmailTransform
- **Ubicación**: `src/shared/infrastructure/decorators/email-transform.decorator.ts`
- **Uso**: Se aplica a campos de email en DTOs
- **Función**: Convierte automáticamente emails a minúsculas y elimina espacios

### EmailTransformPipe
- **Ubicación**: `src/shared/infrastructure/pipes/email-transform.pipe.ts`
- **Uso**: Pipe que puede aplicarse globalmente o en endpoints específicos
- **Función**: Transforma todos los campos que contengan "email"

## Seguridad

### Autenticación
- Todos los endpoints requieren JWT válido
- Los usuarios solo pueden ver sus propias credenciales

### Autorización
- **Lectura**: Todos los usuarios autenticados pueden ver todas las tareas
- **Escritura**: Solo el propietario puede editar/eliminar sus tareas
- **Validación**: Se verifica la propiedad antes de permitir modificaciones

## Estructura de Base de Datos

No se requirieron cambios en la base de datos. La relación existente entre User y Task es suficiente:

```prisma
model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

## Testing

Para probar los nuevos endpoints:

1. **Crear usuarios** diferentes con `POST /api/auth/register`
2. **Crear tareas** con diferentes usuarios con `POST /api/tasks`
3. **Obtener todas las tareas** con `GET /api/tasks` (debería mostrar todas)
4. **Intentar editar tarea de otro usuario** (debería fallar con 403)
5. **Editar tarea propia** (debería funcionar)

## Consideraciones de Rendimiento

- Las tareas se ordenan por fecha de creación descendente
- Se usa `select` en lugar de `include` completo para optimizar la consulta del usuario
- Solo se traen los campos necesarios del usuario (id, email, name)
