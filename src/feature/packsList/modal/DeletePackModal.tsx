import React from 'react'
import { BasicModalPacksList } from './BasicModalPacksList'
import { PackModalPropsType } from './AddEditPackModal'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useAppDispatch } from '../../../redux/store'
import { deletePackTC } from '../../../redux/packsReducer'

export const DeletePackModal: React.FC<
    PackModalPropsType & { name: string; packId: string; deletePackModalOpenId: string }
> = ({ closeModal, open, packId, name, deletePackModalOpenId }) => {
    const dispatch = useAppDispatch()

    const deletePack = () => {
        dispatch(deletePackTC(packId))
    }

    return (
        <BasicModalPacksList
            title={'Delete Pack'}
            open={open && deletePackModalOpenId === packId}
            closeModal={closeModal}
        >
            <Typography variant="h6" component="h1">
                Do you really want to remove {name}? All cards will be deleted.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    sx={{
                        borderRadius: '30px',
                        color: 'black',
                        background: 'white',
                        width: '127px',
                    }}
                    variant="contained"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    onClick={deletePack}
                    sx={{ borderRadius: '30px', width: '127px' }}
                    variant="contained"
                    color="error"
                >
                    Delete
                </Button>
            </Box>
        </BasicModalPacksList>
    )
}
