import React, { ChangeEvent, useEffect, useState } from 'react'
import { BasicModalPacksList } from './BasicModalPacksList'
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useAppDispatch } from '../../../redux/store'
import { changePackTC, createPackTC } from '../../../redux/packsReducer'
import Typography from '@mui/material/Typography'
import { getBase64 } from '../../../utils'

export type PackModalPropsType = {
    open: boolean
    closeModal: () => void
    packId?: string
    name?: string
    changePackModalOpenId?: string
}
type AddEditPackType = { title: 'Edit pack' | 'Add new pack'; image: string }

export const AddEditPackModal: React.FC<PackModalPropsType & AddEditPackType> = ({
    open,
    closeModal,
    title,
    packId,
    name,
    changePackModalOpenId,
    image,
}) => {
    const [inputValue, setInputValue] = useState(name)
    const [inputChecked, setInputChecked] = useState(false)
    const [selectedImage, setSelectedImage] = useState(image)

    const dispatch = useAppDispatch()

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onChangeInputCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputChecked(e.currentTarget.checked)
    }

    const onClickAddChangeButtonHandler = () => {
        if (title === 'Add new pack') {
            dispatch(
                createPackTC({
                    name: inputValue,
                    private: inputChecked ? inputChecked : '',
                    deckCover: selectedImage,
                })
            )
        } else if (title === 'Edit pack' && packId) {
            dispatch(
                changePackTC({
                    _id: packId,
                    name: inputValue,
                    private: inputChecked ? inputChecked : false,
                    deckCover: selectedImage,
                })
            )
        }
        setInputValue('')
        setSelectedImage('')
        closeModal()
    }

    const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            const resultFile = await getBase64(file)
            setSelectedImage(resultFile)
        }
    }

    useEffect(() => {
        return () => {
            setInputValue(name)
            setSelectedImage(image)
        }
    }, [closeModal])

    if (!open) return null

    return (
        <BasicModalPacksList
            title={title}
            open={packId === changePackModalOpenId}
            closeModal={closeModal}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6">Cover</Typography>
                <label>
                    <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
                    <Button variant="contained" component="span">
                        Change cover
                    </Button>
                </label>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img style={{ width: '300px' }} src={selectedImage} alt="photo" />
            </Box>
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
