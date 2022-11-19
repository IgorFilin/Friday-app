import { Dispatch } from 'redux'
import { RequestStatus, setError, setLoading } from './app-reducer'
import { CardType, packsCardApi } from '../api/api'
import { AppRootReducerType } from './store'

type PacksActionsType =
    | ReturnType<typeof setPacksCardAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setPageAC>

export type PacksCardParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
    block?: boolean
}

type initialStateType = typeof initialState

const initialState = {
    cardPacks: [] as Array<CardType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}

export const packsCardReducer = (
    state: initialStateType = initialState,
    action: PacksActionsType
): initialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-CARD': {
            return { ...state, cardPacks: action.packsCard }
        }
        case 'PACKS/SET-PAGE-COUNT': {
            return { ...state, pageCount: action.pageCount }
        }
        case 'PACKS/SET-PAGE': {
            return { ...state, page: action.newPage }
        }
        default: {
            return state
        }
    }
}

export const setPacksCardAC = (packsCard: Array<CardType>) => {
    return { type: 'PACKS/SET-PACKS-CARD', packsCard } as const
}
export const setPageCountAC = (pageCount: number) => {
    return { type: 'PACKS/SET-PAGE-COUNT', pageCount } as const
}
export const setPageAC = (newPage: number) => {
    return { type: 'PACKS/SET-PAGE', newPage } as const
}

export const getPacksCardTC =
    () => async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        const packs = getState().packsCard
        let params: PacksCardParamsType = {
            min: packs.minCardsCount,
            max: packs.maxCardsCount,
            page: packs.page,
            pageCount: packs.pageCount,
        }
        try {
            dispatch(setLoading(RequestStatus.loading))
            const result = await packsCardApi.getPacksCard(params)
            dispatch(setPacksCardAC(result.cardPacks))
        } catch (e) {
            dispatch(setError(e as string))
            dispatch(setLoading(RequestStatus.error))
        } finally {
            dispatch(setLoading(RequestStatus.succeeded))
        }
    }
