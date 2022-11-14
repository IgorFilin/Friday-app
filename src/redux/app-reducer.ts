import { Dispatch } from "redux";
import { authApi } from "../api/api";
import { setIsLogin, setProfileData } from "./auth-reducer";

export enum RequestStatus {
  "idle",
  "loading",
  "succeeded",
  "error",
}

type actionsType =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setError>
  | ReturnType<typeof setAppInitialized>;

type initialStateType = typeof initialState;

const initialState = {
  request: {
    status: RequestStatus.idle,
    error: null as string | null,
  },
  isInitialized: false,
};

export const appReducer = (
  state: initialStateType = initialState,
  action: actionsType
): initialStateType => {
  switch (action.type) {
    case "APP/SET-LOADING": {
      return { ...state, request: { ...state.request, status: action.value } };
    }
    case "APP/SET-ERROR": {
      return {
        ...state,
        request: { ...state.request, error: action.textError },
      };
    }
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    default: {
      return state;
    }
  }
};

export const setLoading = (value: RequestStatus) => {
  return { type: "APP/SET-LOADING", value } as const;
};
export const setError = (textError: string | null) => {
  return { type: "APP/SET-ERROR", textError } as const;
};

export const setAppInitialized = (isInitialized: boolean) => {
  return { type: "APP/SET-IS-INITIALIZED", isInitialized } as const;
};

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const res = await authApi.me();
    dispatch(setProfileData(res));
    dispatch(setIsLogin(true));
  } catch (error) {
    dispatch(setError(error as string));
    dispatch(setLoading(RequestStatus.error));
  } finally {
    dispatch(setLoading(RequestStatus.idle));
  }
};
