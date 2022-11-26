import React, { PropsWithChildren } from 'react'
import { useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'
import { Path } from './AppRoutes'

export const LoginRedirect: React.FC<PropsWithChildren> = ({ children }) => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    if (!isLogin) return <Navigate to={Path.login} />
    return <>{children}</>
}
