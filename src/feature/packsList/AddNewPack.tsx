import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { createPackTC } from '../../redux/packsReducer'
import { RequestStatus } from '../../redux/appReducer'

export const AddNewPack = () => {
    const dispatch = useAppDispatch()

    const requestStatus = useAppSelector((state) => state.app.request.status)

    const addNewPackHandler = () => {
        dispatch(createPackTC({ name: 'MyPack(filin)' }))
    }

    return (
        <>
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
