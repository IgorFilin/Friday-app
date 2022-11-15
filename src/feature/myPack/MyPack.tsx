import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'

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
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 7,
                    width: '100%',
                }}
            >
                <Stack sx={{ m: 3, alignItems: 'center' }}></Stack>
            </Paper>
        </Container>
    )
}
