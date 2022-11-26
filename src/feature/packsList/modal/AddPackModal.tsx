import React, { ChangeEvent, useState } from 'react'
import { BasicModalPacksList } from './BasicModalPacksList'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../../../redux/store'
import { createPackTC } from '../../../redux/packsReducer'

export type PackModalPropsType = {
    open: boolean
    closeModal: () => void
}

export const AddPackModal: React.FC<PackModalPropsType> = ({ open, closeModal }) => {
    const [inputValue, setInputValue] = useState('')
    const [inputChecked, setInputChecked] = useState(false)

    const dispatch = useAppDispatch()

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputChecked(e.currentTarget.checked)
    }

    const addNewPack = () => {
        dispatch(createPackTC({ name: inputValue, private: inputChecked ? inputChecked : '' }))
        closeModal()
    }

    if (!open) return null

    return (
        <BasicModalPacksList title={'Add new pack'} open={open} closeModal={closeModal}>
            <TextField
                onChange={onChangeInputHandler}
                value={inputValue}
                label="Name"
                variant="standard"
            />
            <Box sx={{ display: 'flex' }}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={onChangeInputCheckedHandler}
                                checked={inputChecked}
                            />
                        }
                        label="Private pack"
                    />
                </FormGroup>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    sx={{
                        borderRadius: '30px',
                        color: 'black',
                        background: 'white',
                        width: '127px',
                    }}
                    variant="contained"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    onClick={addNewPack}
                    sx={{ borderRadius: '30px', width: '127px' }}
                    variant="contained"
                >
                    Save
                </Button>
            </Box>
        </BasicModalPacksList>
    )
}
