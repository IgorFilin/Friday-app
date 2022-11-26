import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

export const SecondaryButton: React.FC<ButtonProps> = (props) => (
    <Button
        {...props}
        variant={'contained'}
        color={'inherit'}
        sx={{
            borderRadius: 5,
            backgroundColor: 'white',
            pl: 3,
            pr: 3,
            textTransform: 'none',
            ...props.sx,
        }}
    />
)
