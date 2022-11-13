import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'

type EditableSpanPropsType = {
    value: string
    disabled?: boolean
    onConfirm: (newValue: string) => void
    onCancel?: () => void
}
export const EditableUserName: React.FC<EditableSpanPropsType> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isEditing, setIsEditing] = useState(false)

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value)
    }

    const setSpanMode = () => setIsEditing(false)
    const setInputMode = () => !props.disabled && setIsEditing(true)

    const cancel = () => {
        setSpanMode()
        setValue(props.value)
        if (props.onCancel) props.onCancel()
    }

    const confirm = () => {
        setSpanMode()
        props.onConfirm(value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') confirm()
        if (e.key === 'Escape') cancel()
    }

    const error = value.trim().length < 1

    return (
        <Box sx={{ mb: 1, display: 'inline-flex', alignItems: 'center' }}>
            {isEditing ? (
                <>
                    <TextField
                        size={'small'}
                        variant={'standard'}
                        InputProps={{ style: { font: 'inherit' } }}
                        value={value}
                        autoFocus
                        helperText={error && 'Input text required'}
                        error={error}
                        onChange={onChangeHandler}
                        // onBlur={confirm}
                        onKeyDown={onKeyDownHandler}
                    />
                    <IconButton color="primary" aria-label="change name" onClick={confirm}>
                        <DoneIcon fontSize={'small'} />
                    </IconButton>
                    <IconButton color="primary" aria-label="change name" onClick={cancel}>
                        <CloseIcon fontSize={'small'} />
                    </IconButton>
                </>
            ) : (
                <>
                    <Typography fontWeight={'bold'} variant="body1">
                        {props.value}
                    </Typography>
                    <IconButton color="primary" aria-label="change name" onClick={setInputMode}>
                        <BorderColorIcon fontSize={'small'} />
                    </IconButton>
                </>
            )}
        </Box>
    )
}
