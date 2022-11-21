import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BlueButton } from '../../components/BlueButton'
import { useAppDispatch } from '../../redux/store'
import { createPackTC } from '../../redux/packsReducer'

export const AddNewPack = () => {
    const dispatch = useAppDispatch()

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
                <BlueButton onClick={addNewPackHandler}>Add new pack</BlueButton>
            </Box>
        </>
    )
}
