import React from 'react'
import { FormControl, InputLabel, Select } from '@mui/material'
import { DialogWithTitle } from './DialogWithTitle'
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import { PrimaryButton } from './PrimaryButton'
import TextField from '@mui/material/TextField'
import { useAppDispatch } from 'redux/store'
import { useParams } from 'react-router-dom'
import { createCardTC } from 'redux/cardsReducer'
import { useFormik } from 'formik'

type PropsType = {
    open: boolean
    onClose: () => void
}

enum QuestionFormat {
    text,
    image,
    video,
}

export const AddNewCardDialog: React.FC<PropsType> = ({ onClose, open }) => {
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            format: QuestionFormat.text,
        },
        onSubmit: (values) => {
            if (!packId) return
            dispatch(
                createCardTC({
                    cardsPack_id: packId,
                    answer: values.answer,
                    question: values.question,
                })
            )
        },
    })

    return (
        <DialogWithTitle
            title={'Add new card'}
            fullWidth
            maxWidth={'xs'}
            open={open}
            onClose={onClose}
        >
            <Stack sx={{ mt: 2 }}>
                <FormControl component="form" onSubmit={formik.handleSubmit} size="small" fullWidth>
                    <InputLabel id="question-format-label">Choose a question format</InputLabel>
                    <Select
                        id="format"
                        name="format"
                        labelId="question-format-label"
                        label="Choose a question format"
                        value={formik.values.format}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={QuestionFormat.text}>Text</MenuItem>
                        <MenuItem value={QuestionFormat.image}>Image</MenuItem>
                        <MenuItem value={QuestionFormat.video}>Video</MenuItem>
                    </Select>

                    <TextField
                        sx={{ mb: 1, mt: 1 }}
                        id="question"
                        name="question"
                        label="Question"
                        variant="standard"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        id="answer"
                        name="answer"
                        label="Answer"
                        variant="standard"
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                    />
                    <PrimaryButton type="submit" sx={{ mb: 2, mt: 3 }}>
                        Add
                    </PrimaryButton>
                </FormControl>
            </Stack>
        </DialogWithTitle>
    )
}
