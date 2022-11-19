import { Dispatch } from 'redux'
import { CardType, packsCardApi, PacksCardType } from 'api/api'
import { AppRootReducerType } from './store'
import { RequestStatus, setErrorAC, setLoadingAC } from './appReducer'

type PacksActionsType =
    | ReturnType<typeof setPacksCardAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setPageAC>
    | ReturnType<typeof sortPacksAC>

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
    sortPacks: '0updated',
}

export const packsCardReducer = (
    state: initialStateType = initialState,
    action: PacksActionsType
): initialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-CARD': {
            return { ...state, ...action.packsCard }
        }
        case 'PACKS/SET-PAGE-COUNT': {
            return { ...state, pageCount: action.pageCount }
        }
        case 'PACKS/SET-PAGE': {
            return { ...state, page: action.newPage }
        }
        case 'PACKS/SORT-PACKS': {
            return { ...state, sortPacks: action.valueSort }
        }
        default: {
            return state
        }
    }
}

export const setPacksCardAC = (packsCard: PacksCardType) => {
    return { type: 'PACKS/SET-PACKS-CARD', packsCard } as const
}
export const setPageCountAC = (pageCount: number) => {
    return { type: 'PACKS/SET-PAGE-COUNT', pageCount } as const
}
export const setPageAC = (newPage: number) => {
    return { type: 'PACKS/SET-PAGE', newPage } as const
}
export const sortPacksAC = (valueSort: string) => {
    return { type: 'PACKS/SORT-PACKS', valueSort } as const
}

export const getPacksCardTC =
    () => async (dispatch: Dispatch, getState: () => AppRootReducerType) => {
        const packs = getState().packsCard
        let params: PacksCardParamsType = {
            min: packs.minCardsCount,
            max: packs.maxCardsCount,
            page: packs.page,
            pageCount: packs.pageCount,
            sortPacks: packs.sortPacks,
        }
        try {
            dispatch(setLoadingAC(RequestStatus.loading))
            const result = await packsCardApi.getPacksCard(params)
            dispatch(setPacksCardAC(result))
        } catch (e) {
            dispatch(setErrorAC(e as string))
            dispatch(setLoadingAC(RequestStatus.error))
        } finally {
            dispatch(setLoadingAC(RequestStatus.succeeded))
        }
    }
