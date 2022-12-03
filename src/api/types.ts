export type ChangePackCardType = {
    _id: string
    name?: string
    private?: boolean
}

export type RecoveryEmailType = {
    email: string
}

export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
    deckCover: string | null
}

export type PacksCardType = {
    cardPacks: Array<CardPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CreatePackCardType = {
    name?: string
    deckCover?: string
    private?: boolean | string
}

export type DataFormType = {
    email?: string
    password?: string
    currPassword?: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type SingUpResponseType = {
    addedUser: {}
    error?: string
}

export type LoginResponseType = ProfileDataType & {
    _id: string
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    created: Date
    updated: Date
    publicCardPacksCount: number // количество колод
    error?: string
}

export type ProfileDataType = {
    id: string
    email: string
    name: string
    avatar?: string
}

export type LogoutResponseType = {
    info: string
    error: string
}
export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type ResponseForgotPasswordType = {
    info: string
    success: boolean
}
export type ResponseSetNewPasswordType = {
    info: string
    error: string
}

export type GetCardsParamsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type NewCardType = {
    cardsPack_id: string
    answer: string
    question: string
}

export type EditCardType = {
    _id: string
    answer: string
    question: string
}

export type CardsStateType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
