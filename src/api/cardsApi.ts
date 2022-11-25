import { CardsStateType, CardType, EditCardType, GetCardsParamsType, NewCardType } from './types'
import { instance } from './instance'
import { getDataFromAxiosResponse, parseAxiosError } from './responseParsers'

export const cardsApi = {
    getCards(params: GetCardsParamsType) {
        return instance
            .get<CardsStateType>('/cards/card', { params })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    createCard(card: NewCardType) {
        return instance
            .post('/cards/card', { card }) //response object not required
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    deleteCard(cardId: string) {
        return instance
            .delete('/cards/card?id=' + cardId) //response object not required
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
    updateCard(editCard: EditCardType) {
        return instance
            .put<CardType>('/cards/card', { card: editCard }) //response object not required
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
}
