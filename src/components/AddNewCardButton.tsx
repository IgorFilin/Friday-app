import React, { useState } from 'react'
import { AddNewCardDialog, ValuesType } from './AddNewCardDialog'
import { PrimaryButton } from './PrimaryButton'

type PropsType = {
    onSubmit: (values: ValuesType) => void
}

export const AddNewCardButton: React.FC<PropsType> = ({ onSubmit }) => {
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
