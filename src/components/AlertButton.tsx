import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

export const AlertButton: React.FC<ButtonProps> = (props) => (
    <Button
        {...props}
        variant={'contained'}
        sx={{
            borderRadius: 5,
            backgroundColor: 'red',
            pl: 3,
            pr: 3,
            textTransform: 'none',
            ...props.sx,
        }}
    />
)
