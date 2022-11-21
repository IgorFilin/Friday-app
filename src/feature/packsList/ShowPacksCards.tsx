import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, ButtonGroup } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC } from '../../redux/packsReducer'

export const ShowPacksCards = () => {
    const [showPacksCards, setShowPacksCards] = React.useState<'All' | 'My'>('All')

    const authUserId = useAppSelector((state) => state.auth.profileData.id)
    const dispatch = useAppDispatch()

    const onClickShowPacksHandler = (changeButton: 'All' | 'My', authUserId?: string) => {
        if (changeButton === 'My' && authUserId) {
            setShowPacksCards(changeButton)
            dispatch(getPacksCardTC(authUserId))
        } else {
            setShowPacksCards(changeButton)
            dispatch(getPacksCardTC())
        }
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
                        onClick={() => onClickShowPacksHandler('My', authUserId)}
                        sx={{
                            width: '196px',
                            height: '39px',
                        }}
                        variant={showPacksCards === 'My' ? 'contained' : 'outlined'}
                    >
                        My
                    </Button>
                    <Button
                        onClick={() => onClickShowPacksHandler('All')}
                        sx={{
                            width: '196px',
                            height: '39px',
                        }}
                        variant={showPacksCards === 'All' ? 'contained' : 'outlined'}
                    >
                        All
                    </Button>
                </ButtonGroup>
            </Box>
        </>
    )
}
