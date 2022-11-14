import { instance } from './instance'
import { RecoveryEmailType } from 'feature/password_recovery/Password_recovery'
import {
    parseAxiosError,
    getDataFromAxiosResponse,
    parseLoginResponse,
    parseUpdatedUserResponse,
    parseLogoutResponse,
    parseSingUpResponse,
} from './responseParsers'

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
    ForgotPass(email: RecoveryEmailType) {
        return instance.post('/auth/forgot', {
            email: email.email,
            // кому восстанавливать пароль
            message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow
                        <a href='http://localhost:3000/#/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
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

//==TYPES=========================================================================================

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
