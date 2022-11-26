import React from 'react'
import { BasicModal } from 'components/BasicModal'
import { Button } from '@mui/material'

type PropsType = {
    open: boolean
    onClose: () => void
}

export const NewCardModal: React.FC<PropsType> = ({ onClose, open }) => {
    return (
        <BasicModal open={open} onClose={onClose}>
            <>
                <div>BasicModal</div>
                <Button onClick={onClose}>Close</Button>
            </>
        </BasicModal>
    )
}
