import { Dispatch } from 'redux'
import { RequestStatus, setErrorAC, setLoadingAC } from './appReducer'
import { AppDispatch, AppRootReducerType } from './store'
import { cardsApi, UpdatedGradeType } from 'api/cardsApi'
import {
    CardsStateType,
    CardType,
    GetCardsParamsType,
    NewCardType,
    NewPicturesCardType,
} from '../api/types'
import { ErrorResponseType } from '../api/responseParsers'
import { setIsLoginAC } from './authReducer'
import { getBase64 } from '../utils'

//===TYPES======================================================================

export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setCardQuestionAC>
    | ReturnType<typeof setSortCardsAC>
    | ReturnType<typeof putGradeAC>

type InitialStateType = typeof initialState

//===REDUCER====================================================================

const initialState = {
    cards: [] as Array<CardType>,
    cardsTotalCount: 10,
    page: 1,
    pageCount: 10,
    packUserId: '',
    cardQuestion: '',
    sortCards: '',
    packName: '',
    packDeckCover: '',
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
        case 'CARDS/SET-PAGE':
            return { ...state, page: action.page }
        case 'CARDS/SET-PAGE-COUNT':
            return { ...state, pageCount: action.pageCount }
        case 'CARDS/SET-CARD-QUESTION':
            return { ...state, cardQuestion: action.cardQuestion }
        case 'CARDS/SET-SORT-CARDS':
            return { ...state, sortCards: action.sortCards }
        case 'CARDS/UPDATE-CARDS-GRADE':
            return {
                ...state,
                cards: state.cards.map((c) =>
                    c._id === action.updatedGrade._id
                        ? { ...c, grade: action.updatedGrade.grade }
                        : c
                ),
            }
        default: {
            return state
        }
    }
}

//===ACTIONS====================================================================

export const putGradeAC = (updatedGrade: UpdatedGradeType) => {
    return {
        type: 'CARDS/UPDATE-CARDS-GRADE',
        updatedGrade,
    } as const
}

export const setCardsAC = (cardsState: CardsStateType) => {
    return { type: 'CARDS/SET-CARDS', cardsState } as const
}

export const updateCardAC = (card: CardType) => {
    return { type: 'CARDS/UPDATE-CARD', card } as const
}

export const setPageAC = (page: number) => {
    return { type: 'CARDS/SET-PAGE', page } as const
}

export const setPageCountAC = (pageCount: number) => {
    return { type: 'CARDS/SET-PAGE-COUNT', pageCount } as const
}

export const setCardQuestionAC = (cardQuestion: string) => {
    return { type: 'CARDS/SET-CARD-QUESTION', cardQuestion } as const
}

export const setSortCardsAC = (sortCards: string) => {
    return { type: 'CARDS/SET-SORT-CARDS', sortCards } as const
}

//===THUNKS=====================================================================

export const fetchCardsTC =
    (cardsPack_id: string, pageCount?: number) =>
    async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        try {
            const cards = getState().cards
            const params = {
                cardsPack_id,
                pageCount: pageCount,
                page: cards.page,
                cardQuestion: cards.cardQuestion,
                sortCards: cards.sortCards,
                packName: cards.packName,
            } as GetCardsParamsType
            dispatch(setLoadingAC(RequestStatus.loading))
            const res = await cardsApi.getCards(params)
            dispatch(setCardsAC(res as CardsStateType))
        } catch (error) {
            const { status, message } = error as ErrorResponseType
            dispatch(setErrorAC(message))
            if (status === 401) dispatch(setIsLoginAC(false))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const createCardTC = (newCard: NewCardType) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoadingAC(RequestStatus.loading))
        await cardsApi.createCard(newCard)
        dispatch(fetchCardsTC(newCard.cardsPack_id))
    } catch (error) {
        const { status, message } = error as ErrorResponseType
        dispatch(setErrorAC(message))
        if (status === 401) dispatch(setIsLoginAC(false))
        dispatch(setLoadingAC(RequestStatus.error))
    } finally {
        dispatch(setLoadingAC(RequestStatus.idle))
    }
}

export const createPicturesCardTC =
    (newPicturesCard: NewPicturesCardType) => async (dispatch: AppDispatch) => {
        const answerB64 = await getBase64(newPicturesCard.answerFile)
        const questionB64 = await getBase64(newPicturesCard.questionFile)
        dispatch(
            createCardTC({
                cardsPack_id: newPicturesCard.cardsPack_id,
                answer: answerB64,
                question: questionB64,
            })
        )
    }

export const deleteCardTC =
    (cardId: string, cardsPackId: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            await cardsApi.deleteCard(cardId)
            dispatch(fetchCardsTC(cardsPackId))
        } catch (error) {
            const { status, message } = error as ErrorResponseType
            dispatch(setErrorAC(message))
            if (status === 401) dispatch(setIsLoginAC(false))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const editCardTC =
    (_id: string, answer: string, question: string, cardsPackId: string) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            await cardsApi.updateCard({ _id, answer, question })
            dispatch(fetchCardsTC(cardsPackId))
        } catch (error) {
            const { status, message } = error as ErrorResponseType
            dispatch(setErrorAC(message))
            if (status === 401) dispatch(setIsLoginAC(false))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }

export const setLearnCardsTC =
    (grade: number, card_id: string) =>
    async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            const res = await cardsApi.putLearnCards(grade, card_id)
            dispatch(putGradeAC(res as UpdatedGradeType))
        } catch (error) {
            const { status, message } = error as ErrorResponseType
            dispatch(setErrorAC(message))
            if (status === 401) dispatch(setIsLoginAC(false))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }
