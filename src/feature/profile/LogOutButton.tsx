import React from 'react'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'

export const LogOutButton: React.FC = () => {
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
