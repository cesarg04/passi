# Documentación del Proyecto Frontend - Gestor de Tareas

## 📋 Descripción General

Esta es una aplicación móvil de gestión de tareas desarrollada con **React Native**, **Expo Router** y **TypeScript**. La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus tareas con funcionalidades en tiempo real a través de WebSockets.

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
frontend/
├── app/                          # Rutas de la aplicación (Expo Router)
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── _layout.tsx          # Layout de autenticación
│   │   ├── login.tsx            # Pantalla de login
│   │   └── register.tsx         # Pantalla de registro
│   ├── (main)/                   # Rutas principales de la app
│   │   ├── _layout.tsx          # Layout principal
│   │   ├── home.tsx             # Pantalla principal
│   │   ├── profile.tsx          # Pantalla de perfil
│   │   └── settings.tsx         # Pantalla de configuración
│   ├── index.tsx                # Punto de entrada - redirecciona a main
│   └── _layout.tsx              # Layout raíz de la aplicación
├── private/                      # Componentes privados específicos
│   └── tasks/                    # Módulo de tareas
├── public/                       # Módulos públicos (auth schemas)
├── shared/                       # Componentes y servicios compartidos
│   ├── api/                     # Configuración de API
│   ├── components/              # Componentes reutilizables
│   ├── hooks/                   # Hooks personalizados
│   ├── services/               # Servicios de API
│   ├── store/                  # Estado global (Zustand)
│   └── types/                  # Definiciones de tipos
└── assets/                      # Recursos estáticos
```

## 🔧 Tecnologías Principales

- **React Native** (0.79.5)
- **Expo** (~53.0.20)
- **Expo Router** (~5.1.4) - Para navegación
- **React Native Paper** (^5.14.5) - Componentes UI
- **TypeScript** (~5.8.3)
- **React Hook Form** (^7.62.0) - Manejo de formularios
- **TanStack Query** (^5.84.1) - Gestión de estado del servidor
- **Zustand** (^5.0.7) - Estado global
- **Socket.IO Client** (^4.8.1) - WebSockets en tiempo real
- **Yup** (^1.7.0) - Validación de esquemas

## 🔐 Sistema de Autenticación

### AuthStore (Zustand)
```typescript
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}
```

### Flujo de Autenticación
1. **Registro/Login**: Los usuarios pueden registrarse o iniciar sesión
2. **Token Storage**: Los tokens se almacenan de forma segura con `expo-secure-store`
3. **Estado Global**: El estado de autenticación se maneja con Zustand
4. **Navegación**: Redirección automática según el estado de autenticación

## 📱 Pantallas Principales

### 1. Pantallas de Autenticación (`(auth)`)

#### Login (`login.tsx`)
- Formulario de inicio de sesión con email y contraseña
- Validación con React Hook Form y Yup
- Redirección automática a `/home` tras login exitoso

#### Registro (`register.tsx`)
- Formulario de registro con nombre, email y contraseña
- Validación de datos en tiempo real
- Creación automática de sesión tras registro

### 2. Pantalla Principal (`(main)/home.tsx`)
- **Dashboard principal** con lista de tareas
- **Header personalizado** con botón de logout y título
- **Botón "Agregar tarea"** que abre modal
- **Lista de tareas** con componente `TaskItem`
- **WebSocket integrado** para actualizaciones en tiempo real

## 🎯 Componente TaskItem - Análisis Detallado

### Ubicación: `shared/components/taskItem/TaskItem.tsx`

Este es uno de los componentes más importantes de la aplicación. Representa cada tarea individual en la lista y utiliza un **patrón de interacción basado en "long press"**.

### Funcionamiento del TaskItem

#### 1. **Interacción Principal - Long Press**
```typescript
<TouchableOpacity
  onPress={onSelectTask}           // Tap normal - selecciona tarea
  onLongPress={onShowPopover}      // Long Press - muestra opciones
>
```

**¿Cómo funciona?**
- **Tap corto**: Solo selecciona la tarea (actualmente solo log en consola)
- **Long Press (mantener presionado)**: Muestra un popover con opciones

#### 2. **Popover con Opciones**
El componente utiliza `react-native-popover-view` para mostrar un menú contextual:

```typescript
const popoverItems = [
  {
    label: "Completar tarea",
    onPress: () => {
      // Marca la tarea como completada
      updateTask.mutateAsync({
        id: props.item.id,
        body: { ...props.item, completed: true }
      });
    },
    disabled: props.item.completed, // No disponible si ya está completada
    icon: <EditIcon />
  },
  {
    label: "Eliminar tarea",
    onPress: () => {
      // Elimina la tarea
      deleteTask.mutateAsync(props.item.id.toString());
    },
    disabled: false,
    icon: <TrashIcon />
  }
];
```

#### 3. **Elementos Visuales**
- **Checkbox**: Muestra el estado de completado
- **Título**: Texto principal de la tarea
- **Fecha**: Fecha de creación formateada
- **Iconos SVG**: Para las acciones (editar/eliminar)

#### 4. **Estados y Feedback**
- **Tarea completada**: Checkbox marcado, opción "Completar" deshabilitada
- **Tarea pendiente**: Checkbox vacío, todas las opciones disponibles
- **Loading states**: Manejo de estados de carga en las mutaciones

### Instrucciones de Uso para el Usuario

**Para interactuar con una tarea:**

1. **Ver detalles**: Toca brevemente la tarea
2. **Mostrar opciones**: **Mantén presionada la tarea por 1-2 segundos**
3. **Completar tarea**: En el menú que aparece, toca "Completar tarea"
4. **Eliminar tarea**: En el menú que aparece, toca "Eliminar tarea"
5. **Cerrar menú**: Toca fuera del menú o la tarea nuevamente

## 🔄 Sistema en Tiempo Real

### WebSocket Hook (`useTaskSocket.ts`)

La aplicación utiliza Socket.IO para actualizaciones en tiempo real:

```typescript
export const useTaskSocket = () => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  useEffect(() => {
    const socket = io("http://localhost:3000/tasks", {
      auth: { token: token },
    });

    // Escucha eventos del servidor
    socket.on("task:created", (task) => { /* Actualiza cache */ });
    socket.on("task:updated", (task) => { /* Actualiza cache */ });
    socket.on("task:deleted", ({ id }) => { /* Actualiza cache */ });

    return () => socket.disconnect();
  }, [queryClient, token]);
};
```

**Eventos soportados:**
- `task:created` - Nueva tarea creada
- `task:updated` - Tarea actualizada
- `task:deleted` - Tarea eliminada

## 🗂️ Gestión de Estado

### 1. Estado Global (Zustand)
- **AuthStore**: Manejo de autenticación y usuario
- **ThemeStore**: Configuración de temas (claro/oscuro)

### 2. Estado del Servidor (TanStack Query)
- **Queries**: Para obtener datos (getTasks, getTask)
- **Mutations**: Para modificar datos (createTask, updateTask, deleteTask)
- **Cache Management**: Invalidación automática de cache

### 3. Estado Local (React State)
- Estados específicos de componentes
- Formularios con React Hook Form

## 🎨 Sistema de Temas

La aplicación soporta temas claro y oscuro:

```typescript
const useCustomTheme = () => {
  const colorScheme = useColorScheme();
  const { isDarkMode } = useThemeStore();
  
  return isDarkMode ? darkTheme : lightTheme;
};
```

**Componentes que se adaptan:**
- Colores de fondo
- Colores de texto
- Iconos SVG
- Popover y modales

## 📝 Formularios y Validación

### React Hook Form + Yup

Todos los formularios utilizan este patrón:

```typescript
const formConfig = useForm({
  defaultValues: defaultValues,
  resolver: yupResolver(validationSchema),
  mode: "onTouched"
});
```

**Formularios principales:**
- Login (email, password)
- Registro (name, email, password)
- Crear tarea (title, description)

## 🔌 API y Servicios

### Base API (`shared/api/baseApi.ts`)
- Configuración centralizada de Axios
- Interceptores para autenticación
- Manejo de errores

### Servicios
- **AuthServices**: Login, registro, perfil
- **TasksServices**: CRUD de tareas
- Integración con TanStack Query

## 🚀 Navegación

### Expo Router File-Based Routing

**Rutas principales:**
- `/` - Redirecciona a `/(main)/home`
- `/(auth)/login` - Pantalla de login
- `/(auth)/register` - Pantalla de registro
- `/(main)/home` - Dashboard principal

## 🛠️ Componentes Reutilizables

### Formularios
- **FormControl**: Wrapper para campos de formulario
- **FormLabel**: Etiquetas de campos
- **FormTextField**: Campo de texto con validación
- **FormError**: Mensajes de error

### UI Components
- **PrimaryButton**: Botón principal personalizado
- **LogoutButton**: Botón de cerrar sesión
- **Box**: Contenedor con estilos predefinidos
- **CustomText**: Texto con temas adaptativos

### Modales y Sheets
- **ActionSheet**: Para crear tareas
- **Popover**: Para menús contextuales

## ⚡ Rendimiento y Optimizaciones

### TanStack Query
- **Cache inteligente** de respuestas API
- **Background refetch** automático
- **Optimistic updates** en mutaciones

### WebSockets
- **Actualizaciones en tiempo real** sin polling
- **Reconexión automática**
- **Cache synchronization**

### React Native
- **FlatList** para listas eficientes
- **Memoización** de componentes pesados
- **Lazy loading** cuando sea necesario

## 📱 Instalación y Uso

### Requisitos
- Node.js 18+
- Expo CLI
- React Native development environment

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm start           # Inicia Expo Dev Server
npm run android     # Ejecuta en Android
npm run ios         # Ejecuta en iOS
npm run web         # Ejecuta en navegador
```

## 🐛 Debugging y Testing

### Debug
- **React Native Debugger** para debugging
- **Flipper** para inspección de red y estado
- **Expo DevTools** para logs y performance

### Logs importantes
- WebSocket connections
- API requests/responses
- Authentication state changes
- Task operations

## 📚 Patrones y Buenas Prácticas

### 1. **Custom Hooks Pattern**
- `useTaskSocket` - WebSocket management
- `useAuthServices` - Authentication operations
- `useTasksServices` - Task operations

### 2. **Component Composition**
- Componentes pequeños y reutilizables
- Props bien tipadas con TypeScript
- Separación de lógica y presentación

### 3. **Error Handling**
- Try-catch en operaciones async
- Error boundaries para componentes
- Feedback visual para errores

### 4. **Performance**
- React.memo para componentes pesados
- useMemo/useCallback para optimizaciones
- Lazy loading para screens grandes

## 🔮 Funcionalidades Futuras

### Posibles Mejoras
1. **Offline Support** con AsyncStorage
2. **Push Notifications** para recordatorios
3. **Drag & Drop** para reordenar tareas
4. **Filtros y Búsqueda** avanzada
5. **Categorías de Tareas**
6. **Colaboración** entre usuarios
7. **Sincronización** multiplataforma
8. **Dark/Light Mode Toggle** en settings

---

## 💡 Notas Importantes para Desarrolladores

### TaskItem - Comportamiento Específico
- **Long Press es obligatorio** para mostrar opciones
- **Timeout de 1 segundo** en operaciones para UX suave
- **Popover se cierra automáticamente** después de seleccionar opción
- **Estados de disabled** bien manejados para evitar errores

### WebSockets
- **Conexión automática** al montar componente Home
- **Reconexión** al cambiar token de autenticación
- **Sincronización bidireccional** con el cache de queries

### Formularios
- **Validación en tiempo real** con modo "onTouched"
- **Reset automático** después de submit exitoso
- **Estados de loading** en botones durante submission
