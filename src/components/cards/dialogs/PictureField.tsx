import React, { ChangeEvent, useState } from 'react'
import Box from '@mui/material/Box'
import defaultImage from 'assets/notImage.jpg'
import { FlexBox } from 'components/FlexBox'
import { PrimaryButton } from 'components/PrimaryButton'

type PropsType = {
    name: string
    label: string
    onChange: (file: File) => void
}
export const PictureField: React.FC<PropsType> = ({ name, label,onChange }) => {
    const [previewSrc, setPreviewSrc] = useState(defaultImage)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget?.files || e.currentTarget?.files.length < 1) return
        const file = e.currentTarget.files[0]
        setPreviewSrc(URL.createObjectURL(file))
        onChange(file)
    }

    return (
        <>
            <label>
                <input hidden type="file" accept="image/*" name={name} onChange={onChangeHandler} />
                <br />
                <FlexBox justifyContent="space-between" alignItems="center">
                    {label}:<PrimaryButton component="span">Change cover</PrimaryButton>
                </FlexBox>
            </label>
            <Box marginTop={1} width={'100%'} height={'100%'}>
                <img style={{ maxWidth: '100%' }} src={previewSrc} alt={name} />
            </Box>
        </>
    )
}
