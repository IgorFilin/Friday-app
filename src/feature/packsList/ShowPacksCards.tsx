import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, ButtonGroup } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setShowPacksCards } from '../../redux/packsReducer'

export const ShowPacksCards = () => {
    const whosePackCard = useAppSelector((state) => state.packsCard.whosePackCard)

    const dispatch = useAppDispatch()

    const onClickShowPacksHandler = (changeButton: 'All' | 'My') => {
        dispatch(setShowPacksCards(changeButton))
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                <Typography variant="h6">Show packs cards</Typography>
                <ButtonGroup
                    sx={{
                        width: '196px',
                        height: '39px',
                    }}
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                >
                    <Button
                        onClick={() => onClickShowPacksHandler('My')}
                        sx={{
                            width: '196px',
                            height: '39px',
                        }}
                        variant={whosePackCard === 'My' ? 'contained' : 'outlined'}
                    >
                        My
                    </Button>
                    <Button
                        onClick={() => onClickShowPacksHandler('All')}
                        sx={{
                            width: '196px',
                            height: '39px',
                        }}
                        variant={whosePackCard === 'All' ? 'contained' : 'outlined'}
                    >
                        All
                    </Button>
                </ButtonGroup>
            </Box>
        </>
    )
}
