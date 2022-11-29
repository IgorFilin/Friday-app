import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { RequestStatus } from '../../redux/appReducer'
import { AddEditPackModal } from './modal/AddEditPackModal'

export const AddNewPack = () => {
    const [addPackModalOpen, setAddPackModalOpen] = useState(false)

    const requestStatus = useAppSelector((state) => state.app.request.status)

    const dispatch = useAppDispatch()

    const addNewPackHandler = () => {
        setAddPackModalOpen(true)
    }

    const closeModalAddPack = () => {
        setAddPackModalOpen(false)
    }

    return (
        <>
            <AddEditPackModal
                name=""
                title="Add new pack"
                open={addPackModalOpen}
                closeModal={closeModalAddPack}
            />
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
