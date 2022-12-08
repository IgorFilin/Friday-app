import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import Stack from '@mui/material/Stack'
import { DialogWithTitle } from 'components/DialogWithTitle'
import { CardForm } from './components/CardForm'
import { editCardTC } from 'redux/cardsReducer'

type PropsType = {
    cardId: string | null
    onClose: () => void
}

export const EditCardDialog: React.FC<PropsType> = ({ cardId, onClose }) => {
    const dispatch = useAppDispatch()
    const card = useAppSelector((state) => state.cards.cards.find((c) => c._id === cardId))

    const { question, answer, cardsPack_id, _id } = card ?? {
        question: '',
        answer: '',
        cardsPack_id: '',
        _id: '',
    }

    const onSubmitHandler = (question: string, answer: string) => {
        dispatch(editCardTC(_id, question, answer, cardsPack_id))
        onClose()
    }

    return (
        <DialogWithTitle
            title={'Edit card'}
            fullWidth
            maxWidth={'xs'}
            open={!!cardId}
            onClose={onClose}
        >
            <Stack sx={{ mt: 2 }}>
                <CardForm
                    question={question}
                    answer={answer}
                    submitLabel={'Apply'}
                    onSubmit={onSubmitHandler}
                />
            </Stack>
        </DialogWithTitle>
    )
}
