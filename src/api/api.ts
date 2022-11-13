import { dataFormType } from "../feature/registration/Registration";
import { instance } from "./instance";
import { FormikErrorType } from "../feature/login/Login";

export const authApi = {
  SingUp(dataForm: dataFormType) {
    instance.post<{ addedUser: any; error?: string }>(
      "/auth/register",
      dataForm
    );
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
