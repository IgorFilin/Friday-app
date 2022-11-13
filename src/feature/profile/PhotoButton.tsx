import React from 'react'
import Fab from '@mui/material/Fab'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

export const PhotoButton: React.FC = () => {
    return (
        <Fab size={'small'} component="label" aria-label="upload photo">
            <input hidden accept="image/*" type="file" />
            <PhotoCamera color={'info'} />
        </Fab>
    )
}
