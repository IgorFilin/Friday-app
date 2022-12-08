import React from 'react'
import Stack from '@mui/material/Stack'
import { DialogWithTitle } from 'components/DialogWithTitle'
import { useAppDispatch } from 'redux/store'
import { createCardTC, createPicturesCardTC } from 'redux/cardsReducer'
import { useParams } from 'react-router-dom'
import { CardDataFormat, CardForm } from './components/CardForm'

type PropsType = {
    open: boolean
    onClose: () => void
}

export const AddNewCardDialog: React.FC<PropsType> = ({ open, onClose }) => {
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()

    const onSubmitHandler = (
        format: CardDataFormat,
        question: string | File,
        answer: string | File
    ) => {
        if (!packId) return
        if (format === CardDataFormat.text) {
            dispatch(
                createCardTC({
                    cardsPack_id: packId,
                    question: question as string,
                    answer: answer as string,
                })
            )
        } else {
            dispatch(
                createPicturesCardTC({
                    cardsPack_id: packId,
                    questionFile: question as File,
                    answerFile: answer as File,
                })
            )
        }
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
