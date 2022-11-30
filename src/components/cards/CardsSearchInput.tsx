import React, { ChangeEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { RequestStatus } from 'redux/appReducer'
import { setCardQuestionAC } from 'redux/cardsReducer'
import { useDebounce } from 'usehooks-ts'

type PropsType = {
    width: string | number
}

export const CardsSearchInput: React.FC<PropsType> = ({ width }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const dispatch = useAppDispatch()

    const [cardQuestion, setCardQuestion] = useState(
        useAppSelector((state) => state.cards.cardQuestion)
    )
    const debouncedCardQuestion = useDebounce(cardQuestion, 500)

    useEffect(() => {
        dispatch(setCardQuestionAC(debouncedCardQuestion))
    }, [debouncedCardQuestion, dispatch])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCardQuestion(e.currentTarget.value)
    }

    return (
        <Box
            sx={{
                width,
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}
        >
            <Typography variant="h6">Search</Typography>
            <TextField
                disabled={requestStatus === RequestStatus.loading}
                size={'small'}
                placeholder={'Provide your text'}
                value={cardQuestion}
                onChange={onChangeHandler}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchSharpIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
