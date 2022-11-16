import React from 'react'
import { useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { BackToPacksListButton } from './BackToPacksListButton'

export const MyPack: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    if (!isLogin) return <Navigate to="/login" />

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                // bgcolor: '#cfe8fc',
            }}
        >
            <Stack sx={{ m: 3, alignItems: 'center' }}>
                <BackToPacksListButton />
            </Stack>
        </Container>
    )
}
