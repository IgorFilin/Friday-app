import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
}
type BasicModalType = {
    children: JSX.Element
    open: boolean
    onClose: () => void
}
export const BasicModal: React.FC<BasicModalType> = ({ children, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>{children}</Box>
        </Modal>
    )
}
