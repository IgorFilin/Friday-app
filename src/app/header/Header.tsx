import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'redux/store'
import { HeaderAvatar } from './HeaderAvatar'
import { DEV_VERSION } from 'config'
import lion from '../../assets/lion.png'

export const Header: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    const navigate = useNavigate()

    const onClickSingInHandler = () => {
        navigate('/login')
    }

    return (
        <AppBar
            color={'inherit'}
            position="static"
            sx={{
                pl: '10%',
                pr: '10%',
                boxShadow:
                    '0 4px 18px rgb(54 110 255 / 35%), inset 0 1px 0 hsl(0deg 0% 100% / 30%)',
            }}
        >
            <Toolbar>
                <img
                    style={{ cursor: 'pointer', width: '70px', height: '70px' }}
                    src={lion}
                    alt={'logo'}
                    onClick={() => navigate('/')}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
                    {DEV_VERSION && 'DEV VERSION'}
                </Typography>
                {isLogin ? (
                    <HeaderAvatar />
                ) : (
                    <Button
                        sx={{
                            width: '113px',
                            borderRadius: 5,
                        }}
                        variant="contained"
                        onClick={onClickSingInHandler}
                    >
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}
