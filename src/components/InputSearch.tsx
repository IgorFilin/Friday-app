import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { InputAdornment } from '@mui/material'
import SearchSharpIcon from '@mui/icons-material/SearchSharp'
import Box from '@mui/material/Box'
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store";

export const InputSearch: React.FC<{ width?: number | string }> = ({ width }) => {

    const dispatch = useDispatch()
    const question = useAppSelector(state => state.decks.cardsData)

    const [inputValue, setInputValue] = React.useState('')
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
                size={'small'}
                placeholder={'Provide your text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
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
