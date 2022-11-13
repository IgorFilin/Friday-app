import { instance } from "./instance";

export type singInType = {
  addedUser: any;
  error: { email: string; error: string; in: string } | null;
};

export type DataFormType = {
  email?: string;
  password?: string;
  currPassword?: string;
};

export const authApi = {
  SingUp(dataForm: DataFormType) {
    return instance.post<singInType>("/auth/register", dataForm);
  },
  Login(data: LoginDataType) {
    return instance.post("/auth/login", data);
  },
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
