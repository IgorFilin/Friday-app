import { instance } from './instance'
import { RecoveryEmailType } from 'feature/password_recovery/Password_recovery'
import {
    getDataFromAxiosResponse,
    parseAxiosError,
    parseLoginResponse,
    parseLogoutResponse,
    parseSingUpResponse,
    parseUpdatedUserResponse,
} from './responseParsers'
import { PacksCardParamsType } from '../redux/packs-reducer'

export const authApi = {
    singUp(dataForm: DataFormType) {
        return instance
            .post<SingUpResponseType>('/auth/register', dataForm)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseSingUpResponse)
    },
    login(data: LoginDataType) {
        return instance
            .post<LoginResponseType>('/auth/login', data)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLoginResponse)
    },
    forgotPass(email: RecoveryEmailType) {
        return instance.post<ResponseForgotPasswordType>('/auth/forgot', {
            email: email.email,
            message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow 
                        <a href='https://Samurai-way.github.io/Friday-app/#/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>`, // html-письмо, вместо $token$ бэк вставит токен
        })
    },
    setNewPassword({ password, resetPasswordToken }: SetNewPasswordType) {
        return instance.post<ResponseSetNewPasswordType>('/auth/set-new-password', {
            password,
            resetPasswordToken,
        })
    },
    changeUserNameOrAvatar(data: { name?: string; avatar?: string }) {
        return instance
            .put('/auth/me', data)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseUpdatedUserResponse)
    },
    me() {
        return instance
            .post<LoginResponseType>('auth/me')
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLoginResponse)
    },
    logout() {
        return instance
            .delete<LogoutResponseType>('auth/me')
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLogoutResponse)
    },
}

export const packsCardApi = {
    getPacksCard(params: PacksCardParamsType) {
        return instance
            .get<GetPacksCardType>('/cards/pack', { params })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },
}

//==TYPES=========================================================================================

export type CardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}
export type GetPacksCardType = {
    cardPacks: Array<CardType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
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
    error?: string //{ email: string; error: string; in: string } | null
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
