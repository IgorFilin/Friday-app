import { authApi, DataFormType, LoginDataType, ProfileDataType } from "api/api";
import { RequestStatus, setError, setLoading } from "./app-reducer";
import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import {RecoveryEmailType} from "feature/password_recovery/Password_recovery";

type AuthActionsType =
    | ReturnType<typeof setSingUp>
    | ReturnType<typeof setIsLogin>
    | ReturnType<typeof getEmailForgotPass>
    | ReturnType<typeof setProfileData>;

type InitialStateType = typeof initialState;

const initialState = {
  isSingUp: false,
  isLogin: false,
  email: "",
  profileData: { email: "", name: "" } as ProfileDataType, // avatar: undefined
};

export const authReducer = (
    state: InitialStateType = initialState,
    action: AuthActionsType
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
    case "AUTH/SET-PROFILE-DATA":
      return {
        ...state,
        profileData: action.profileData,
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
export const getEmailForgotPass = (email: string) => {
  return { type: "FORGOT-PASS/GET-EMAIL", email } as const;
};
export const setProfileData = (profileData: ProfileDataType) => {
  return { type: "AUTH/SET-PROFILE-DATA", profileData } as const;
};

export const SingUpTC = (value: DataFormType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const response = await authApi.singUp(value);
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

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const res = await authApi.login(data);
    dispatch(setProfileData(res));
    dispatch(setIsLogin(true));
  } catch (error) {
    dispatch(setError(error as string));
    dispatch(setLoading(RequestStatus.error));
  } finally {
    dispatch(setLoading(RequestStatus.idle));
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

function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) resolve(reader.result as string);
      else reject("getBase64: Unexpected error");
    };
    reader.onerror = (error) => reject(error);
  });
}

export const changeProfileDataTC =
    ({ avatarFile, name }: { avatarFile?: File; name?: string }) =>
        async (dispatch: Dispatch) => {
          try {
            dispatch(setLoading(RequestStatus.loading));

            let newProfileData = {};
            if (avatarFile) {
              const avatar = await getBase64(avatarFile);
              newProfileData = { ...newProfileData, avatar };
            }
            if (name) {
              newProfileData = { ...newProfileData, name };
            }

            const res = await authApi.changeUserNameOrAvatar(newProfileData);
            dispatch(setProfileData(res));
            dispatch(setIsLogin(true));
          } catch (error) {
            dispatch(setError(error as string));
            dispatch(setLoading(RequestStatus.error));
          } finally {
            dispatch(setLoading(RequestStatus.idle));
          }
        };
