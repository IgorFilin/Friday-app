import { instance } from "./instance";
import {RecoveryEmailType} from "../feature/password_recovery/Password_recovery";
import {
  parseAxiosError,
  getDataFromAxiosResponse,
  parseLoginResponse,
  parseUpdatedUserResponse,
} from "./responseParsers";

export const authApi = {
  singUp(dataForm: DataFormType) {
    return instance.post<SingUpResponseType>("/auth/register", dataForm);
  },
  login(data: LoginDataType) {
    return instance
        .post<LoginResponseType>("/auth/login", data)
        .then(getDataFromAxiosResponse)
        .catch(parseAxiosError)
        .then(parseLoginResponse);
  },
  forgotPass(email: RecoveryEmailType) {
    return instance.post<ResponseForgotPasswordType>("/auth/forgot",             {
          email:email.email,
          message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow 
                        <a href='http://localhost:3000/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>` // хтмп-письмо, вместо $token$ бэк вставит токен
        }
    );
  },
  setNewPassword({password, resetPasswordToken}: SetNewPasswordType) {
    return instance.post<ResponseSetNewPasswordType>("/auth/set-new-password", {password, resetPasswordToken});
  },
  changeUserNameOrAvatar(data: { name?: string; avatar?: string }) {
    return instance
        .put("/auth/me", data)
        .then(getDataFromAxiosResponse)
        .catch(parseAxiosError)
        .then(parseUpdatedUserResponse);
  },
  async me() {
    return instance
        .post<LoginResponseType>("auth/me")
        .then(getDataFromAxiosResponse)
        .catch(parseAxiosError)
        .then(parseLoginResponse);
  },
};

//==TYPES=========================================================================================

export type DataFormType = {
  email?: string;
  password?: string;
  currPassword?: string;
};

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SingUpResponseType = {
  addedUser: any;
  error: { email: string; error: string; in: string } | null;
};

export type SetNewPasswordType = {
  password: string,
  resetPasswordToken: string
}

export type ResponseForgotPasswordType = {
  info: string,
  success: boolean,
}
export type ResponseSetNewPasswordType = {
    info: string
    error: string;
};

export type LoginResponseType = ProfileDataType & {
  _id: string;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  created: Date;
  updated: Date;
  publicCardPacksCount: number; // количество колод
  error?: string;
};

export type ProfileDataType = {
  email: string;
  name: string;
  avatar?: string;
};
