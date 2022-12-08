import React, { ChangeEvent, useState } from 'react'
import Box from '@mui/material/Box'
import defaultImage from 'assets/notImage.jpg'
import { FlexBox } from 'components/FlexBox'
import { PrimaryButton } from 'components/PrimaryButton'
import { getBase64 } from 'utils'

type PropsType = {
    name: string
    label: string
    value?: string
    onChange: (value: string) => void
}
export const PictureField: React.FC<PropsType> = ({ name, label, value, onChange }) => {
    const v = !value || value === '' ? defaultImage : value
    const [previewSrc, setPreviewSrc] = useState(v)

    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget?.files || e.currentTarget?.files.length < 1) return
        const file = e.currentTarget.files[0]
        setPreviewSrc(URL.createObjectURL(file))
        const base64 = await getBase64(file)
        onChange(base64)
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
