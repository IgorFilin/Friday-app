import React, {useEffect} from 'react'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import Box from '@mui/material/Box'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import {TableComponent} from './TableComponent'
import Stack from '@mui/material/Stack'
import {TablePaginationComponent} from 'components/TablePaginationComponent'
import {InputSearch} from 'components/InputSearch'
import Container from '@mui/material/Container'
import {PrimaryButton} from 'components/PrimaryButton'
import {useAppDispatch, useAppSelector} from 'redux/store'
import {setCardsTC} from 'redux/decksReducer'
import {RequestStatus} from 'redux/appReducer'
import {LinearProgress} from '@mui/material'
import {Path} from "../../app/AppRoutes";

export const FriendsPack = () => {
    const dispatch = useAppDispatch()
    const sort = useAppSelector((state) => state.decks.sortCards)
    const page = useAppSelector((state) => state.decks.cardsState.page)
    const pageCount = useAppSelector((state) => state.decks.cardsState.pageCount)
    const statusLoading = useAppSelector((state) => state.app.request.status)
    const packName = useAppSelector((state) => state.decks.cardsState.packName)
    const cardAnswer = useAppSelector(state => state.decks.cardAnswer)

    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()

    useEffect(() => {
        packId && dispatch(setCardsTC(packId, ''))
    }, [sort, pageCount, page, cardAnswer])

    const handleRequest = (param: string) => {
        packId && dispatch(setCardsTC(packId, param, true))
    }

    const learnFriendPackHandler = () => {
        navigate(Path.learnPack + '/' + packId)
    }

    return (
        <>
            {statusLoading === RequestStatus.loading ? (
                <LinearProgress/>
            ) : (
                <>
                    <Container style={{maxWidth: '1000px'}}>
                        <Box style={{width: '100%', margin: '24px auto'}}>
                            <Link
                                to={'/packslist'}
                                style={{textDecoration: 'none', color: 'black'}}
                            >
                                <KeyboardReturnRoundedIcon sx={{mt: 2}}/> Back to Packs List
                            </Link>
                        </Box>
                        <Box
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography
                                variant={'h6'}
                                style={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '27px',
                                }}
                            >
                                {packName || 'Friend’s Pack'}
                                <PrimaryButton
                                    onClick={learnFriendPackHandler}
                                >
                                    Learn this pack
                                </PrimaryButton>
                            </Typography>
                        </Box>
                        <InputSearch handleRequest={handleRequest}/>
                        <TableComponent/>
                        <Stack sx={{width: '100%', margin: '0 auto'}} spacing={2}></Stack>
                        <TablePaginationComponent/>
                    </Container>
                </>
            )}
        </>
    )
}
