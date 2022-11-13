import { authApi, DataFormType, LoginDataType, ProfileDataType } from "api/api";
import { RequestStatus, setError, setLoading } from "./app-reducer";
import { Dispatch } from "redux";

type ActionsType =
  | ReturnType<typeof setSingUp>
  | ReturnType<typeof setIsLogin>
  | ReturnType<typeof setProfileData>;

type InitialStateType = typeof initialState;

const initialState = {
  isSingUp: false,
  isLogin: false,
  profileData: { email: "", name: "" } as ProfileDataType, // avatar: undefined
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

export const setProfileData = (profileData: ProfileDataType) => {
  return { type: "AUTH/SET-PROFILE-DATA", profileData } as const;
};

export const SingUpTC = (value: DataFormType) => async (dispatch: any) => {
  setLoading(RequestStatus.loading);
  try {
    const response = await authApi.singUp(value);
    dispatch(setSingUp(true));
    dispatch(setLoading(RequestStatus.succeeded));
  } catch (e) {
    console.log(e);
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

export const changeProfileData =
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
