import { api } from "@/shared/api/baseApi";
import useAuthStore from "@/shared/store/auth/AuthStore";
import { useMutation } from "@tanstack/react-query";
import { AuthStorage } from "./authStorage";
import { AuthKeys } from "./keys/authKeys";
import { IRegisterResponse, User } from "./responses/RegisterResponse";
import { ILoginValues } from "./values/LoginValues";
import { IRegisterValues } from "./values/RegisterValue";

export const useAuthServices = () => {
  const { login } = useAuthStore();

  const registerMutation = useMutation({
    mutationFn: (data: IRegisterValues) => {
      return api.post<IRegisterResponse>("auth/register", data.body);
    },
    mutationKey: [AuthKeys.REGISTER],
    async onSuccess({ data }, variables, context) {
      await AuthStorage.saveAccessToken(data.access_token);
      login(data.user, data.access_token);
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: ILoginValues) => {
      return api.post<IRegisterResponse>("auth/login", data.body);
    },
    mutationKey: [AuthKeys.LOGIN],
    async onSuccess({ data }, variables, context) {
      await AuthStorage.saveAccessToken(data.access_token);
      login(data.user, data.access_token);
    },
  });

  const getUser = useMutation({
    mutationFn: () => {
      return api.get<User>("auth/profile");
    },
    mutationKey: [AuthKeys.USER],
    async onSuccess({ data }, variables, context) {
      const token = await AuthStorage.getAccessToken();
      if (token) login(data, token);
    },
  });

  return {
    registerMutation,
    loginMutation,
    getUser,
  };
};
