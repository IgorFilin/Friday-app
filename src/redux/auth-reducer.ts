import { authApi, LoginDataType } from "api/api";
import { RequestStatus, setError, setLoading } from "./app-reducer";
import { dataFormType } from "feature/registration/Registration";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

type SetSingUpType = ReturnType<typeof setSingUp>;
type SetIsLoginType = ReturnType<typeof setIsLogin>;

type ActionsType = SetSingUpType | SetIsLoginType;

type InitialStateType = typeof initialState;

const initialState = {
  isSingUp: false,
  isLogin: false,
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

export const SingUpTC = (value: dataFormType) => async (dispatch: any) => {
  setLoading(RequestStatus.loading);
  try {
    const response = await authApi.SingUp(value);
    dispatch(setSingUp(true));
    dispatch(setLoading(RequestStatus.succeeded));
  } catch (e) {
    console.log(e);
  }
};

export const isLoginTC =
  (data: LoginDataType) => async (dispatch: Dispatch) => {
    // debugger;
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
