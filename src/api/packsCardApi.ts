import { PacksCardParamsType } from 'redux/packsReducer'
import { instance } from './instance'
import { ChangePackCardType, CreatePackCardType, PacksCardType } from './types'
import { getDataFromAxiosResponse, parseAxiosError } from './responseParsers'

export const packsCardApi = {
    getPacksCard(params: PacksCardParamsType) {
        return instance
            .get<PacksCardType>('/cards/pack', { params })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    createPackCard(payload: CreatePackCardType) {
        return instance
            .post('/cards/pack', { cardsPack: payload })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    deletePackCard(id: string) {
        return instance
            .delete(`/cards/pack?id=${id}`)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    changePackCard(payload: ChangePackCardType) {
        return instance
            .put('/cards/pack', { cardsPack: payload })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
}
