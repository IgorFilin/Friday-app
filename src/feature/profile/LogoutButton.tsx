import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch } from 'redux/store'
import { logoutTC } from 'redux/authReducer'
import { SecondaryButton } from 'components/SecondaryButton'

export const LogoutButton: React.FC = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <SecondaryButton onClick={onClickHandler}>
            <LogoutIcon fontSize={'small'} sx={{ mr: 1 }} />
            <span>Log out</span>
        </SecondaryButton>
    )
}
