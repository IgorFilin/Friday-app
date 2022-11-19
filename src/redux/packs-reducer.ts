import { Dispatch } from 'redux'
import { RequestStatus, setError, setLoading } from './app-reducer'
import { CardType, packsCardApi } from '../api/api'

type PacksActionsType = ReturnType<typeof setPacksCard>

type initialStateType = typeof initialState

const initialState = {
    cardPacks: [] as Array<CardType>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}

export const packsCardReducer = (
    state: initialStateType = initialState,
    action: PacksActionsType
): initialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-CARD': {
            return { ...state, cardPacks: action.packsCard }
        }
    }
}

export const setPacksCard = (packsCard: Array<CardType>) => {
    return { type: 'PACKS/SET-PACKS-CARD', packsCard } as const
}

export type PacksCardParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
    block: boolean
}
export const getPacksCardTC = (params: PacksCardParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(RequestStatus.loading))
        const result = await packsCardApi.getPacksCard(params)
        dispatch(setPacksCard(result.cardPacks))
    } catch (e) {
        dispatch(setError(e as string))
        dispatch(setLoading(RequestStatus.error))
    } finally {
        dispatch(setLoading(RequestStatus.succeeded))
    }
}
