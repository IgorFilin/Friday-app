import { instance } from "./instance";
import {RecoveryEmailType} from "../feature/password_recovery/Password_recovery";
import axios from "axios";

export type singInType = {
  addedUser: any;
  error: { email: string; error: string; in: string } | null;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
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
  ForgotPass(email: RecoveryEmailType) {
    return instance.post("/auth/forgot",             {
          email:email.email,
          // кому восстанавливать пароль
          message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow 
                        <a href='http://localhost:3000/#/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>` // хтмп-письмо, вместо $token$ бэк вставит токен

        }
    );
  },
};

