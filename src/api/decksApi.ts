import { instance } from './instance'
import { getDataFromAxiosResponse, parseAxiosError } from './responseParsers'
import { DecksStateType } from 'redux/decksReducer'
import { GetCardsParamsType } from './types'

export const decksApi = {
    getDecks(params: GetCardsParamsType) {
        return instance
            .get<DecksStateType>(`/cards/card`, { params })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
}
