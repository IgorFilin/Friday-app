import { authApi, DataFormType, LoginDataType } from "api/api";
import { RequestStatus, setError, setLoading } from "./app-reducer";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import {RecoveryEmailType} from "../feature/password_recovery/Password_recovery";

type SetSingUpType = ReturnType<typeof setSingUp>;
type SetIsLoginType = ReturnType<typeof setIsLogin>;
type GetEmailForgotPassType = ReturnType<typeof getEmailForgotPass>;

type ActionsType = SetSingUpType | SetIsLoginType | GetEmailForgotPassType;

type InitialStateType = typeof initialState;


const initialState = {
  isSingUp: false,
  isLogin: false,
  email: "",
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-SIGN-UP": {
      return { ...state, isSingUp: action.statusSingUp };
    }
    case "AUTH/SET-IS-LOGIN":
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case "FORGOT-PASS/GET-EMAIL": {
      return { ...state, email: action.email };
    }
    default: {
      return state;
    }
  }
};

export const setSingUp = (statusSingUp: boolean) => {
  return { type: "AUTH/SET-SIGN-UP", statusSingUp } as const;
};

export const setIsLogin = (isLogin: boolean) => {
  return { type: "AUTH/SET-IS-LOGIN", isLogin } as const;
};
export const getEmailForgotPass = (email: string) => {
  return { type: "FORGOT-PASS/GET-EMAIL", email } as const;
};

export const SingUpTC = (value: DataFormType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const response = await authApi.SingUp(value);
    dispatch(setSingUp(true));
    dispatch(setLoading(RequestStatus.succeeded));
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message;
      dispatch(setError(error));
    } else {
      dispatch(setError(`Native error ${err.message}`));
    }
  }
};

export const isLoginTC =
  (data: LoginDataType) => async (dispatch: Dispatch) => {
    try {
      const res = await authApi.Login(data);
      dispatch(setIsLogin(true));
    } catch (e: any) {
      const err = e as Error | AxiosError<{ error: string }>;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? err.response.data.error
          : err.message;
        dispatch(setError(error));
        dispatch(setLoading(RequestStatus.error));
      } else {
        dispatch(setError("hello"));
        dispatch(setLoading(RequestStatus.error));
      }
    }
  };
export const ForgotTC = (email: RecoveryEmailType) => async (dispatch: Dispatch) => {
  try {
    setLoading(RequestStatus.loading);
    const response = await authApi.ForgotPass(email);
    dispatch(getEmailForgotPass(email.email));
    dispatch(setLoading(RequestStatus.succeeded));
  } catch (e) {
    console.log(e);
  }
};
