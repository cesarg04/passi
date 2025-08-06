import axios from "axios";
import { ENVIRONMENT_VAR } from "../consts/env/EnvConst";
import { AuthStorage } from "../services/auth/authStorage";

export const api = axios.create({
  baseURL: ENVIRONMENT_VAR.API_URL,
  headers: { "Content-Type": "application/json" }
});

// Interceptor para agregar token en cada request
api.interceptors.request.use(async (config) => {
  const token = await AuthStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});