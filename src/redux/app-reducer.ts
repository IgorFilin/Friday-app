export enum RequestStatus {
  "idle",
  "loading",
  "succeeded",
  "error",
}

type setLoadingType = ReturnType<typeof setLoading>;
type setErrorType = ReturnType<typeof setError>;

type actionsType = setLoadingType | setErrorType;

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
    default: {
      return state;
    }
  }
};

export const setLoading = (value: RequestStatus) => {
  return { type: "APP/SET-LOADING", value } as const;
};
export const setError = (textError: string) => {
  return { type: "APP/SET-ERROR", textError } as const;
};
