import * as React from 'react'
import { Dialog, DialogProps, DialogTitle } from '@mui/material'

type PropsType = DialogProps & {
    title: string
}

export const DialogWithTitle: React.FC<PropsType> = (props) => {
    return (
        <Dialog {...props}>
            <DialogTitle>{props.title}</DialogTitle>
            {props.children}
        </Dialog>
    )
}
