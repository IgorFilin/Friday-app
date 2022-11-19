import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import cat from '../../assets/cat.jpg'
import AppBar from '@mui/material/AppBar'

export const AppBarComponent = () => {
    return (
        <AppBar color={'inherit'} position="static">
            <Toolbar>
                <img
                    style={{ marginLeft: '10%' }}
                    src={
                        'https://it-incubator.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8a063c2a.svg&w=256&q=75'
                    }
                    alt={'logo'}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {/*News*/}
                </Typography>
                <Typography variant={'h6'} sx={{ mr: 1 }}>
                    Name
                </Typography>
                <Avatar alt="Cat" src={cat} sx={{ width: 56, height: 56, mr: 10 }} />
            </Toolbar>
        </AppBar>
    )
}
