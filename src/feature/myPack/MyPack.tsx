import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useIsLoading } from 'redux/store'
import { Navigate, useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Path } from 'app/AppRoutes'
import { setErrorAC } from 'redux/appReducer'
import { fetchCardsTC } from 'redux/cardsReducer'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { CardsTable } from 'components/cards/CardsTable'
import { CardsPagination } from 'components/cards/CardsPagination'
import { MyPackOptions } from './MyPackOptions'
import { CardsSearchInput } from 'components/cards/CardsSearchInput'
import { PrimaryButton } from 'components/PrimaryButton'
import { AddNewCardDialog } from 'components/cards/dialogs/AddNewCardDialog'

export const MyPack: React.FC = () => {
    const userId = useAppSelector((state) => state.auth.profileData.id)
    const { cardQuestion, packUserId, page, pageCount, sortCards, packName } = useAppSelector(
        ({ cards }) => cards
    )
    const { packId } = useParams<'packId'>()
    const [isAddNewCardOpen, setIsAddNewCardOpen] = useState(false)
    const dispatch = useAppDispatch()
    const isLoading = useIsLoading()

    useEffect(() => {
        if (packId) dispatch(fetchCardsTC(packId))
    }, [sortCards, page, pageCount, cardQuestion, packId, dispatch])

    if (packUserId !== '' && packUserId !== userId) {
        dispatch(setErrorAC("It's not yours Cards Pack"))
        return <Navigate to={Path.packsList} />
    }

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
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
                            {packName}
                        </Typography>
                        <MyPackOptions />
                    </Box>
                    <PrimaryButton disabled={isLoading} onClick={() => setIsAddNewCardOpen(true)}>
                        Add new card
                    </PrimaryButton>
                    <AddNewCardDialog
                        open={isAddNewCardOpen}
                        onClose={() => setIsAddNewCardOpen(false)}
                    />
                </Box>
                <CardsSearchInput width={'100%'} />
                <br />
                {packId && packId !== '' && (
                    <>
                        <CardsTable />
                        <CardsPagination />
                    </>
                )}
            </Stack>
        </Container>
    )
}
