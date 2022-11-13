import { authApi } from "api/api";
import { RequestStatus, setError, setLoading } from "./app-reducer";
import { dataFormType } from "feature/registration/Registration";
import axios, { AxiosError } from "axios";
import { throws } from "assert";
import { Dispatch } from "redux";

type setSingUpType = ReturnType<typeof setSingUp>;

type actionsType = setSingUpType;

type initialStateType = typeof initialState;

const initialState = {
  isSingUp: false,
};

export const authReducer = (
  state: initialStateType = initialState,
  action: actionsType
): initialStateType => {
  switch (action.type) {
    case "AUTH/SET-SIGN-UP": {
      return { ...state, isSingUp: action.statusSingUp };
    }
    default: {
      return state;
    }
  }
};

export const setSingUp = (statusSingUp: boolean) => {
  return { type: "AUTH/SET-SIGN-UP", statusSingUp } as const;
};

export const SingUpTC = (value: dataFormType) => async (dispatch: Dispatch) => {
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
      dispatch(setLoading(RequestStatus.error));
    } else {
      dispatch(setError(`Native error ${err.message}`));
      dispatch(setLoading(RequestStatus.error));
    }
  }
};
