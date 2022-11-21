import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { BlueButton } from '../../components/BlueButton'

export const AddNewPack = () => {
    const addNewPackHandler = () => {
        console.log(1)
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
