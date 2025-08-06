import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export const AuthStorage = {
  saveAccessToken: async (token: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  },
  getAccessToken: async () => {
    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  },
  deleteAccessToken: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  },

  saveRefreshToken: async (token: string) => {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  },
  getRefreshToken: async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },
  deleteRefreshToken: async () => {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  }
};