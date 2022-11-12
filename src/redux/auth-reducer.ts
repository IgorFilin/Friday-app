import {Dispatch} from "redux";
import {authApi} from "../../src/api/api";
import {RequestStatus, setLoading} from "./app-reducer";

type setSingUpType = ReturnType<typeof setSingUp>

type actionsType = setSingUpType

type initialStateType = {
    isSingUp: boolean
}

const initialState = {
    isSingUp: false
}

export const authReducer = (state: initialStateType = initialState, action: actionsType) => {
    switch (action.type) {
        case 'AUTH/SET-SIGN-UP': {
            return {...state, isSingUp: action.statusSingUp}
        }
        default: {
            return state
        }
    }
}

export const setSingUp = (statusSingUp: boolean) => {
    return {type: 'AUTH/SET-SIGN-UP', statusSingUp} as const
}

export const SingUpTC = (value: FormData) => async (dispatch: Dispatch) => {
    setLoading(RequestStatus.loading)
    try {
        // @ts-ignore
        const response = await authApi(value)
        dispatch(setSingUp(true))
        dispatch(setLoading(RequestStatus.succeeded))
    } catch (e) {
        console.log(e)
    }


}
