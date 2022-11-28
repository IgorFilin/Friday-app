import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { EditCardDialog } from './EditCardDialog'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'

type PropsType = {
    question: string
    answer: string
    onSubmit: (question: string, answer: string) => void
}

export const EditCardDialogWithButton: React.FC<PropsType> = ({ question, answer, onSubmit }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <IconButton onClick={() => setIsDialogOpen(true)}>
                <DriveFileRenameOutlineIcon />
            </IconButton>
            <EditCardDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={onSubmit}
                question={question}
                answer={answer}
            />
        </>
    )
}
