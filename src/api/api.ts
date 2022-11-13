import { instance } from "./instance";
import {
  parseAxiosError,
  getDataFromAxiosResponse,
  parseLoginResponse,
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
