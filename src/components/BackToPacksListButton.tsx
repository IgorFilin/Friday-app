import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Path } from 'app/AppRoutes'
import { useIsLoading } from 'redux/store'

export const BackToPacksListButton: React.FC = () => {
    const isLoading = useIsLoading()
    const navigate = useNavigate()
    const onClickHandler = () => navigate(Path.packsList)
    return (
        <Button disabled={isLoading} onClick={onClickHandler} style={{ textTransform: 'none' }}>
            <KeyboardBackspaceIcon />
            Back to Packs List
        </Button>
    )
}
