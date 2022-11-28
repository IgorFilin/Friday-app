import React, { useState } from 'react'
import { AddNewCardDialog } from './AddNewCardDialog'
import { PrimaryButton } from '../PrimaryButton'

type PropsType = {
    onSubmit: (question: string, answer: string) => void
}

export const AddNewCardDialogWithButton: React.FC<PropsType> = ({ onSubmit }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            <PrimaryButton onClick={() => setIsDialogOpen(true)}>Add new card</PrimaryButton>
            <AddNewCardDialog
                onClose={() => setIsDialogOpen(false)}
                open={isDialogOpen}
                onSubmit={onSubmit}
            />
        </>
    )
}
