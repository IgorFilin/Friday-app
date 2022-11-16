import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch } from 'redux/store'
import { logoutTC } from 'redux/auth-reducer'
import { WhiteButton } from 'components/WhiteButton'

export const LogoutButton: React.FC = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <WhiteButton>
            <LogoutIcon fontSize={'small'} sx={{ mr: 1 }} onClick={onClickHandler} />
            <span>Log out</span>
        </WhiteButton>
    )
}
