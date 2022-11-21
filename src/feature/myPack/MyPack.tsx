import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { Navigate, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { BlueButton } from 'components/BlueButton'
import { InputSearch } from 'components/InputSearch'
import { TablePaginationComponent } from 'components/TablePaginationComponent'
import { PackTable } from './PackTable'
import { MyPackButtonWithMenu } from './MyPackButtonWithMenu'
import { Path } from 'app/AppRoutes'
import { createCardTC, fetchCardsTC } from 'redux/cardsReducer'
import { setErrorAC } from 'redux/appReducer'

export const MyPack: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    const userId = useAppSelector((state) => state.auth.profileData.id)
    const cardsState = useAppSelector((state) => state.cards)
    const dispatch = useAppDispatch()
    const { packId } = useParams() //for test /63515cf1684bc52aa9f1c764

    useEffect(() => {
        if (isLogin && packId) dispatch(fetchCardsTC({ cardsPack_id: packId }))
    }, [packId, isLogin, dispatch])

    const onAddCardClickHandler = () => {
        if (!packId) return
        dispatch(
            createCardTC({ cardsPack_id: packId, answer: 'test answer', question: 'test question' })
        )
    }

    if (!isLogin) return <Navigate to={Path.login} />

    if (cardsState.packUserId !== '' && cardsState.packUserId !== userId) {
        dispatch(setErrorAC("It's not yours Cards Pack"))
        return <Navigate to={Path.packsList} />
    }

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
                    marginBottom={2}
                >
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography component="span" variant={'h5'}>
                            My Pack
                        </Typography>
                        <MyPackButtonWithMenu />
                    </Box>
                    <BlueButton onClick={onAddCardClickHandler}>Add new card</BlueButton>
                </Box>
                <InputSearch width={'100%'} />
                <br />
                <PackTable
                    rows={cardsState.cards.map((c) => ({
                        question: c.question,
                        answer: c.answer,
                        lastUpdated: c.updated,
                        grade: c.grade,
                    }))}
                />

                <TablePaginationComponent />
            </Stack>
        </Container>
    )
}
