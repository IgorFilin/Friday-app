import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import DialogContentText from '@mui/material/DialogContentText'
import { useAppSelector } from 'redux/store'
import { DialogWithTitle } from '../DialogWithTitle'
import { AlertButton } from '../AlertButton'
import { SecondaryButton } from '../SecondaryButton'
import { RequestStatus } from 'redux/appReducer'

type PropsType = {
    cardName: string
    open: boolean
    onClose: () => void
    onSubmit: () => void
}

export const DeleteCardDialog: React.FC<PropsType> = ({ open, cardName, onClose, onSubmit }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)

    return (
        <DialogWithTitle
            title={'Delete Card'}
            fullWidth
            maxWidth={'xs'}
            open={open}
            onClose={onClose}
        >
            <Stack>
                <DialogContentText variant={'body1'}>
                    Do you really want to remove <b>{cardName}</b>?
                    <br />
                    All cards will be deleted.
                </DialogContentText>
                <Box margin={2} display={'flex'} justifyContent={'space-between'}>
                    <SecondaryButton
                        disabled={requestStatus === RequestStatus.loading}
                        onClick={onClose}
                    >
                        Cansel
                    </SecondaryButton>
                    <AlertButton
                        disabled={requestStatus === RequestStatus.loading}
                        onClick={onSubmit}
                    >
                        Delete
                    </AlertButton>
                </Box>
            </Stack>
        </DialogWithTitle>
    )
}
