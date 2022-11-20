import { cardsApi, CardsStateType, GetCardsParamsType } from 'api/api'
import { Dispatch } from 'redux'
import { RequestStatus, setErrorAC, setLoadingAC } from './appReducer'

//===TYPES======================================================================

type AuthActionsType = ReturnType<typeof setCardsAC>
type InitialStateType = typeof initialState

//===REDUCER====================================================================

const initialState = {
    cardsState: {
        cards: [],
        cardsTotalCount: 0,
        page: 1,
        pageCount: 0,
        maxGrade: 0,
        minGrade: 0,
        packUserId: '',
    } as CardsStateType,
}

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: AuthActionsType
): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return { ...state, cardsState: action.cardsState }
        default: {
            return state
        }
    }
}

//===ACTIONS====================================================================

export const setCardsAC = (cardsState: CardsStateType) => {
    return { type: 'CARDS/SET-CARDS', cardsState } as const
}

//===THUNKS=====================================================================

export const fetchCardsTC = (params: GetCardsParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(RequestStatus.loading))
        const res = await cardsApi.getCards(params)
        dispatch(setCardsAC(res))
    } catch (error) {
        dispatch(setErrorAC(error as string))
        dispatch(setLoadingAC(RequestStatus.error))
    } finally {
        dispatch(setLoadingAC(RequestStatus.idle))
    }
}
