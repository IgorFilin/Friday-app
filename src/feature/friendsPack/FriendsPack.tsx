import React, {useEffect} from 'react'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import Box from '@mui/material/Box'
import {Link, Navigate, useNavigate, useParams} from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { TableComponent } from './TableComponent'
import Stack from '@mui/material/Stack'
import { TablePaginationComponent } from '../../components/TablePaginationComponent'
import { InputSearch } from '../../components/InputSearch'
import Container from '@mui/material/Container'
import { BlueButton } from '../../components/BlueButton'
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {setCardsTC} from "../../redux/decksReducer";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const FriendsPack = () => {
    const dispatch = useAppDispatch()
    const decks = useAppSelector((state) => state.decks)
    const isLogin = useAppSelector((state) => state.auth.isLogin)



    const params = useParams<'id'>()
    const some = params.id


    useEffect(() => {
        dispatch(setCardsTC(some))
    }, [])

    if(!isLogin){
        return <Navigate to={'/login'} />
    }
    return (
        <>
            {!decks.cardsData.cards.length ? (
                <Typography
                    variant={'h6'}
                    style={{
                        fontWeight: 'bold',
                        // display: 'flex',
                        margin: '20px 40%',
                        // justifyContent: 'space-between',
                    }}
                >
                    Sorry, maps is over =(
                </Typography>
            ) : (
                <Container sx={{ maxWidth: '1008px' }}>
                    <Box style={{ width: '100%', margin: '24px auto' }}>
                        <Link to={'/packslist'} style={{ textDecoration: 'none', color: 'black' }}>
                            <KeyboardReturnRoundedIcon sx={{ mt: 2 }} /> Back to Packs List
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
                                marginTop: '27px'
                            }}
                        >
                            Friend’s Pack
                            <BlueButton>Learn to pack</BlueButton>
                        </Typography>
                    </Box>
                    <InputSearch />
                    <TableComponent />
                    <Stack sx={{ width: '100%', margin: '0 auto' }} spacing={2}></Stack>
                    <TablePaginationComponent />
                </Container>
            )}
        </>
    )
}
