import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import avatar from 'assets/cat.jpg'

export const Profile = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
            }}
        >
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 7,
                    width: 400,
                    height: 300,
                }}
            >
                <Stack sx={{ m: 3, alignItems: 'center' }}>
                    <Typography variant="h5">Personal Information</Typography>
                    <Avatar sx={{ width: 96, height: 96 }} alt="user avatar" src={avatar} />
                </Stack>
            </Paper>
        </Container>
    )
}
