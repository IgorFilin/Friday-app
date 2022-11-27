import React from 'react'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton/IconButton'

type PropsType = DialogProps & {
    title: string
}

export const DialogWithTitle: React.FC<PropsType> = (props) => {
    const onCloseHandler = () => {
        props.onClose && props.onClose({}, 'escapeKeyDown')
    }

    return (
        <Dialog {...props}>
            <DialogTitle
                variant={'h5'}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {props.title}
                <IconButton onClick={onCloseHandler}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>{props.children}</DialogContent>
        </Dialog>
    )
}
