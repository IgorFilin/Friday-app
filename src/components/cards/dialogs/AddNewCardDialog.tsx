import React from 'react'
import { useFormik } from 'formik'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DialogWithTitle } from '../../DialogWithTitle'
import { PrimaryButton } from '../../PrimaryButton'
import { RequestStatus } from 'redux/appReducer'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { createCardTC, createPicturesCardTC } from 'redux/cardsReducer'
import { useParams } from 'react-router-dom'
import { PictureField } from './PictureField'

export enum QuestionFormat {
    text,
    image,
    video,
}

type ErrorsType = {
    question?: string
    answer?: string
    format?: QuestionFormat
}

type ValuesType = {
    question: string
    questionFile: File
    answer: string
    answerFile: File
    format: QuestionFormat
}

type PropsType = {
    open: boolean
    onClose: () => void
}

export const AddNewCardDialog: React.FC<PropsType> = ({ onClose, open }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()

    const onCloseHandler = () => {
        formik.resetForm()
        onClose()
    }

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            format: QuestionFormat.text,
        } as ValuesType,
        validate: (values) => {
            const errors: ErrorsType = {}
            if (formik.values.format === QuestionFormat.text) {
                if (!values.question) errors.question = 'Required'
                if (!values.answer) errors.answer = 'Required'
            }
            return errors
        },
        onSubmit: async (values) => {
            if (packId)
                if (formik.values.format === QuestionFormat.text) {
                    dispatch(
                        createCardTC({
                            cardsPack_id: packId,
                            question: values.question,
                            answer: values.answer,
                        })
                    )
                } else {
                    dispatch(
                        createPicturesCardTC({
                            cardsPack_id: packId,
                            questionFile: values.questionFile,
                            answerFile: values.answerFile,
                        })
                    )
                }
            onCloseHandler()
        },
    })

    return (
        <DialogWithTitle
            title={'Add new card'}
            fullWidth
            maxWidth={'xs'}
            open={open}
            onClose={onCloseHandler}
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
                    </Select>
                    {formik.values.format === QuestionFormat.image ? (
                        <>
                            <PictureField
                                id="question"
                                name="question"
                                label="Question"
                                onChange={(file) => (formik.values.questionFile = file)}
                            />
                            <PictureField
                                id="answer"
                                name="answer"
                                label="Answer"
                                onChange={(file) => formik.setFieldValue('answerFile', file)}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                id="question"
                                name="question"
                                label="Question"
                                variant="standard"
                                value={formik.values.answer}
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
                        </>
                    )}
                    <PrimaryButton
                        disabled={
                            !(formik.isValid && formik.dirty) ||
                            requestStatus === RequestStatus.loading
                        }
                        type="submit"
                        sx={{ mb: 2, mt: 3 }}
                    >
                        Add
                    </PrimaryButton>
                </FormControl>
            </Stack>
        </DialogWithTitle>
    )
}
