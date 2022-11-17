import React from 'react'
import { useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { BlueButton } from 'components/BlueButton'
import { InputSearch } from 'components/InputSearch'
import { TablePaginationComponent } from 'components/TablePaginationComponent'

export const MyPack: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    if (!isLogin) return <Navigate to="/login" />

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                // bgcolor: '#cfe8fc',
            }}
        >
            <Stack width={'100%'} sx={{ m: 3, alignItems: 'center' }}>
                <Box width={'100%'} marginBottom={2}>
                    <BackToPacksListButton />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <Typography variant={'h5'}>My Pack</Typography>{' '}
                    <BlueButton>Add new card</BlueButton>
                </Box>
                <InputSearch width={'100%'} />

                <TablePaginationComponent />
            </Stack>
        </Container>
    )
}
