import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { createPackTC } from '../../redux/packsReducer'
import { RequestStatus } from '../../redux/appReducer'
import { AddPackModal } from './modal/AddPackModal'

export const AddNewPack = () => {
    const dispatch = useAppDispatch()
    const [addPackModalOpen, setAddPackModalOpen] = useState(false)

    const requestStatus = useAppSelector((state) => state.app.request.status)

    const addNewPackHandler = () => {
        setAddPackModalOpen(true)
        // dispatch(createPackTC({ name: 'MyPack' }))
    }
    const closeModalAddPack = () => {
        setAddPackModalOpen(false)
    }
    return (
        <>
            <AddPackModal open={addPackModalOpen} closeModal={closeModalAddPack} />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 'bold',
                    }}
                >
                    Packs list
                </Typography>
                <PrimaryButton
                    disabled={requestStatus === RequestStatus.loading}
                    onClick={addNewPackHandler}
                >
                    Add new pack
                </PrimaryButton>
            </Box>
        </>
    )
}
