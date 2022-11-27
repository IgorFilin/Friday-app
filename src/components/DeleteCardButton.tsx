import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DeleteCardDialog } from './DeleteCardDialog'

type PropsType = {
    cardName: string
    onSubmit: () => void
}

export const DeleteCardButton: React.FC<PropsType> = ({ cardName, onSubmit }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <IconButton onClick={() => setIsDialogOpen(true)}>
                <DeleteIcon />
            </IconButton>
            <DeleteCardDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={onSubmit}
                cardName={cardName}
            />
        </>
    )
}
