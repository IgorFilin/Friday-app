import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import DialogContentText from '@mui/material/DialogContentText'
import {useAppDispatch, useAppSelector, useIsLoading} from 'redux/store'
import {DialogWithTitle} from '../../DialogWithTitle'
import {AlertButton} from '../../AlertButton'
import {SecondaryButton} from '../../SecondaryButton'
import {deleteCardTC} from 'redux/cardsReducer'
import {UniCell} from "../../UniCell";

type PropsType = {
    cardId: string | null
    onClose: () => void
}

export const DeleteCardDialog: React.FC<PropsType> = ({ cardId, onClose }) => {
    const isLoading = useIsLoading()
    const dispatch = useAppDispatch()
    const card = useAppSelector((state) => state.cards.cards.find((c) => c._id === cardId))

    const { question, cardsPack_id, _id } = card ?? {
        question: '',
        answer: '',
        cardsPack_id: '',
        _id: '',
    }

    const onSubmitHandler = () => {
        dispatch(deleteCardTC(_id, cardsPack_id))
        onClose()
    }

    return (
        <DialogWithTitle
            title={'Delete Card'}
            fullWidth
            maxWidth={'xs'}
            open={!!cardId}
            onClose={onClose}
        >
            <Stack>
                <DialogContentText variant={'body1'}>
                    Do you really want to remove <b><UniCell data={question} alt={'question'}/></b>?
                </DialogContentText>
                <Box margin={2} display={'flex'} justifyContent={'space-between'}>
                    <SecondaryButton
                        disabled={isLoading}
                        onClick={onClose}
                    >
                        Cansel
                    </SecondaryButton>
                    <AlertButton
                        disabled={isLoading}
                        onClick={onSubmitHandler}
                    >
                        Delete
                    </AlertButton>
                </Box>
            </Stack>
        </DialogWithTitle>
    )
}
