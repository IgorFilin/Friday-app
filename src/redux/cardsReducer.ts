import { cardsApi, CardsStateType, CardType, GetCardsParamsType, NewCardType } from 'api/api'
import { Dispatch } from 'redux'
import { RequestStatus, setErrorAC, setLoadingAC } from './appReducer'
import { AppDispatch } from './store'

//===TYPES======================================================================

export type CardsActionsType = ReturnType<typeof setCardsAC> | ReturnType<typeof updateCardAC>

type InitialStateType = typeof initialState

//===REDUCER====================================================================

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 0,
    page: 1,
    pageCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
}

export const cardsReducer = (
    state: InitialStateType = initialState,
    action: CardsActionsType
): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return { ...state, ...action.cardsState }
        case 'CARDS/UPDATE-CARD':
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card._id === action.card._id ? { ...card, ...action.card } : card
                ),
            }
        default: {
            return state
        }
    }
}

//===ACTIONS====================================================================

export const setCardsAC = (cardsState: CardsStateType) => {
    return { type: 'CARDS/SET-CARDS', cardsState } as const
}

export const updateCardAC = (card: CardType) => {
    return { type: 'CARDS/UPDATE-CARD', card } as const
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

export const createCardTC = (newCard: NewCardType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoadingAC(RequestStatus.loading))
        await cardsApi.createCard(newCard)
        dispatch(fetchCardsTC({ cardsPack_id: newCard.cardsPack_id }))
    } catch (error) {
        dispatch(setErrorAC(error as string))
        dispatch(setLoadingAC(RequestStatus.error))
    } finally {
        dispatch(setLoadingAC(RequestStatus.idle))
    }
}

export const deleteCardTC =
    (cardId: string, cardsPackId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            await cardsApi.deleteCard(cardId)
            dispatch(fetchCardsTC({ cardsPack_id: cardsPackId }))
        } catch (error) {
            dispatch(setErrorAC(error as string))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const updateCardTC = (card: CardType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(RequestStatus.loading))
        const updatedCard = await cardsApi.updateCard(card)
        dispatch(updateCardAC(updatedCard))
    } catch (error) {
        dispatch(setErrorAC(error as string))
        dispatch(setLoadingAC(RequestStatus.error))
    } finally {
        dispatch(setLoadingAC(RequestStatus.idle))
    }
}
