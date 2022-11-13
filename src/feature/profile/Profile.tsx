import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import avatar from 'assets/cat.jpg'
import Badge from '@mui/material/Badge'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LogoutIcon from '@mui/icons-material/Logout'
import Fab from '@mui/material/Fab'

export const Profile = () => {
    const { name, email } = { email: 'j&johnson@gmail.com', name: 'Ivan' }
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
                    height: 350,
                }}
            >
                <Stack sx={{ m: 3, alignItems: 'center' }}>
                    <Typography fontWeight={'bold'} variant="h5">
                        Personal Information
                    </Typography>
                    <Box margin={2}>
                        <UserAvatar src={avatar} />
                    </Box>
                    <UserName name={name} />
                    <UserEmail email={email} />
                    <LogOutButton />
                </Stack>
            </Paper>
        </Container>
    )
}

const PhotoButton: React.FC = () => {
    return (
        <Fab size={'small'} component="label" aria-label="upload photo">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera color={'info'} />
        </Fab>
    )
}

const LogOutButton: React.FC = () => {
    return (
        <Button
            variant={'contained'}
            startIcon={<LogoutIcon />}
            color={'inherit'}
            sx={{
                ml: '10px',
                borderRadius: 5,
                backgroundColor: 'white',
                pl: 3,
                pr: 3,
                textTransform: 'none',
            }}
        >
            Log out
        </Button>
    )
}

const UserAvatar: React.FC<{ src: string }> = ({ src }) => {
    return (
        <Badge
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            overlap="circular"
            badgeContent={<PhotoButton />}
        >
            <Avatar sx={{ width: 96, height: 96 }} alt="user avatar" src={src} />
        </Badge>
    )
}

const UserName: React.FC<{ name: string }> = ({ name }) => {
    return (
        <Typography fontWeight={'bold'} sx={{ mb: 1 }} variant="body1">
            {name}
        </Typography>
    )
}

const UserEmail: React.FC<{ email: string }> = ({ email }) => {
    return (
        <Link sx={{ mb: 3 }} href={email} underline="hover">
            {email}
        </Link>
    )
}
