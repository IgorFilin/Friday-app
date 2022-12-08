import React from 'react'
import Stack from '@mui/material/Stack'
import { DialogWithTitle } from 'components/DialogWithTitle'
import { useAppDispatch } from 'redux/store'
import { createCardTC } from 'redux/cardsReducer'
import { useParams } from 'react-router-dom'
import { CardForm } from './components/CardForm'

type PropsType = {
    open: boolean
    onClose: () => void
}

export const AddNewCardDialog: React.FC<PropsType> = ({ open, onClose }) => {
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()

    const onSubmitHandler = (question: string, answer: string) => {
        if (!packId) return
        dispatch(
            createCardTC({
                cardsPack_id: packId,
                question: question as string,
                answer: answer as string,
            })
        )
        onClose()
    }

    return (
        <DialogWithTitle
            title={'Add new card'}
            fullWidth
            maxWidth={'xs'}
            open={open}
            onClose={onClose}
        >
            <Stack sx={{ mt: 2 }}>
                <CardForm submitLabel={'Add'} onSubmit={onSubmitHandler} />
            </Stack>
        </DialogWithTitle>
    )
}
