import React from 'react'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppDispatch } from 'redux/store'
import { logoutTC } from 'redux/auth-reducer'

export const LogOutButton: React.FC = () => {
    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <Button
            variant={'contained'}
            startIcon={<LogoutIcon />}
            color={'inherit'}
            sx={{
                ml: '10px',
                borderRadius: 5,
                backgroundColor: 'white',
                pl: 3,
                pr: 3,
                textTransform: 'none',
            }}
            onClick={onClickHandler}
        >
            Log out
        </Button>
    )
}
