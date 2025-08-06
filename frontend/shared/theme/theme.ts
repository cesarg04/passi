import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

export const Lighttheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0066CC', // Azul oscuro para botones y encabezados
    accent: '#0066CC', // Azul oscuro para botones secundarios
    background: '#F0F0F0', // Gris claro para el fondo de la pantalla
    surface: '#FFFFFF', // Blanco para tarjetas y elementos de la interfaz
    text: '#333333', // Negro suave para el texto principal
    placeholder: '#666666', // Gris medio para texto secundario,
    error: 'red',
  },
};


export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3399FF', // Azul más brillante para buen contraste en modo oscuro
    accent: '#3399FF', // Azul consistente con el primary
    background: '#121212', // Fondo general casi negro
    surface: '#1E1E1E', // Gris muy oscuro para tarjetas y elementos
    text: '#E0E0E0', // Gris claro para texto principal
    placeholder: '#888888', // Gris tenue para placeholder
    error: '#CF6679', // Rojo adaptado para dark mode
  },
};



