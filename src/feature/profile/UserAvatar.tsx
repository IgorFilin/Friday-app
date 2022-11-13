import React from 'react'
import Badge from '@mui/material/Badge'
import { PhotoButton } from './PhotoButton'
import Avatar from '@mui/material/Avatar'

export const UserAvatar: React.FC<{ src: string }> = ({ src }) => {
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
