import { dataFormType } from "../feature/registration/Registration";
import { instance } from "./instance";

export type singInType = {
  addedUser: any;
  error: { email: string; error: string; in: string } | null;
};

export const authApi = {
  SingUp(dataForm: dataFormType) {
    return instance.post<singInType>("/auth/register", dataForm);
  },
};
