import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '2px',
}
type BasicModalType = {
    title: string
    children: ReactNode
    open: boolean
    closeModal: () => void
}

export const BasicModalPacksList: React.FC<BasicModalType> = ({
    children,
    title,
    open,
    closeModal,
}) => {
    if (!open) return null

    return (
        <>
            <Modal open={open} onClose={closeModal}>
                <Box sx={style}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '20px',
                        }}
                    >
                        <Typography variant="h6" component="h2">
                            {title}
                        </Typography>
                        <CloseIcon onClick={closeModal} />
                    </Box>
                    <hr style={{ margin: '0 -32px 25px' }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '35px',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
