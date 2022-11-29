import React, { ChangeEvent, useEffect, useState } from 'react'
import { BasicModalPacksList } from './BasicModalPacksList'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../../../redux/store'
import { changePackTC, createPackTC } from '../../../redux/packsReducer'

export type PackModalPropsType = {
    open: boolean
    closeModal: () => void
    packId?: string
    name?: string
    changePackModalOpenId?: string
}
type AddEditPackType = { title: 'Edit pack' | 'Add new pack' }

export const AddEditPackModal: React.FC<PackModalPropsType & AddEditPackType> = ({
    open,
    closeModal,
    title,
    packId,
    name,
    changePackModalOpenId,
}) => {
    const [inputValue, setInputValue] = useState(name)
    const [inputChecked, setInputChecked] = useState(false)
    useEffect(() => {
        return () => {
            setInputValue(name)
        }
    }, [closeModal])
    const dispatch = useAppDispatch()

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputChecked(e.currentTarget.checked)
    }

    const onClickAddChangeButtonHandler = () => {
        if (title === 'Add new pack') {
            dispatch(createPackTC({ name: inputValue, private: inputChecked ? inputChecked : '' }))
            setInputValue('')
            closeModal()
        } else if (title === 'Edit pack' && packId) {
            dispatch(
                changePackTC({
                    _id: packId,
                    name: inputValue,
                    private: inputChecked ? inputChecked : false,
                })
            )
            closeModal()
        }
    }

    if (!open) return null

    return (
        <BasicModalPacksList
            title={title}
            open={packId === changePackModalOpenId}
            closeModal={closeModal}
        >
            <TextField
                autoFocus
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
                    onClick={onClickAddChangeButtonHandler}
                    sx={{ borderRadius: '30px', width: '127px' }}
                    variant="contained"
                    disabled={inputValue?.length === 0}
                >
                    Save
                </Button>
            </Box>
        </BasicModalPacksList>
    )
}
