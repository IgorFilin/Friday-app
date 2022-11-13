import { authApi } from "api/api";
import { RequestStatus, setLoading } from "./app-reducer";
import { dataFormType } from "feature/registration/Registration";

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
