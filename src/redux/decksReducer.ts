import {Dispatch} from 'redux'
import {RequestStatus, setErrorAC, setIsInitializedAC, setLoadingAC} from './appReducer'
import {setIsLoginAC} from './authReducer'
import {AppRootReducerType} from './store'
import {CardType, GetCardsParamsType} from 'api/types'
import {decksApi} from 'api/decksApi'
import {ErrorResponseType} from '../api/responseParsers'

export type InitialStateType = typeof initialState
export type setCards = ReturnType<typeof setCardsAC>
export type sortCards = ReturnType<typeof sortCardsAC>
export type searchDecks = ReturnType<typeof searchDecksAC>
export type setPageCount = ReturnType<typeof setPageCountAC>
export type setPage = ReturnType<typeof setPageAC>

export type ActionsType = setCards | sortCards | searchDecks | setPageCount | setPage

export type DecksStateType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string,
    packName: string
}

const initialState = {
    cardAnswer: '',
    sortCards: '0grade',
    cardsState: {
        cards: [],
        cardsTotalCount: 0,
        page: 1,
        pageCount: 5,
        maxGrade: 0,
        minGrade: 0,
        packUserId: '',
        packName: '',
    } as DecksStateType,
}

export const decksReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'DECKS/SET-DECKS':
            return {
                ...state,
                cardsState: action.cards
            }
        case 'DECKS/SORT-DECKS':
            return {
                ...state,
                sortCards: action.valueSort,
            }
        case 'DECKS/SEARCH-DECKS':
            return {
                ...state,
                cardAnswer: action.value,
            }
        case 'PACKS/SET-PAGE':
            return {
                ...state,
                cardsState: {...state.cardsState, page: action.page},
            }
        case 'PACKS/SET-PAGE-COUNT':
            return {
                ...state,
                cardsState: {...state.cardsState, pageCount: action.pageCount},
            }
        default:
            return state
    }
}

export const setPageCountAC = (pageCount: number) => {
    return {
        type: 'PACKS/SET-PAGE-COUNT',
        pageCount,
    } as const
}
export const setPageAC = (page: number) => {
    return {
        type: 'PACKS/SET-PAGE',
        page,
    } as const
}

export const searchDecksAC = (value: string) => {
    return {
        type: 'DECKS/SEARCH-DECKS',
        value,
    } as const
}

export const sortCardsAC = (valueSort: '0grade' | '1grade') => {
    return {
        type: 'DECKS/SORT-DECKS',
        valueSort,
    } as const
}

export const setCardsAC = (cards: DecksStateType) => {
    return {
        type: 'DECKS/SET-DECKS',
        cards,
    } as const
}

export const setCardsTC = (id: string, param?: string, isActive?: boolean) =>
    async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        let params: GetCardsParamsType = {cardsPack_id: id}
        if(!isActive){
            const decksSort = getState().decks
            params = {
                cardsPack_id: id,
                sortCards: decksSort.sortCards,
                page: decksSort.cardsState.page,
                pageCount: decksSort.cardsState.pageCount,
                cardAnswer: param,
                packName: decksSort.cardsState.packName
            }
        }
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            const res = await decksApi.getDecks(params)
            dispatch(setCardsAC(res as DecksStateType))
            dispatch(setLoadingAC(RequestStatus.succeeded))
        } catch (error) {
            const {status, message} = error as ErrorResponseType
            dispatch(setErrorAC(message))
            if (status === 401) dispatch(setIsLoginAC(false))
            dispatch(setIsLoginAC(false))
        } finally {
            dispatch(setIsInitializedAC(true))
            dispatch(setLoadingAC(RequestStatus.idle))
        }
    }
