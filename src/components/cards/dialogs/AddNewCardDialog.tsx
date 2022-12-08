import React, { useState } from 'react'
import { useFormik } from 'formik'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
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

type ErrorsType = {
    question?: string
    answer?: string
    questionFile?: string
    answerFile?: string
}

type ValuesType = {
    question: string
    answer: string
    answerFile: File | null
    questionFile: File | null
}

export enum CardDataFormat {
    text,
    image,
    video,
}

type PropsType = {
    open: boolean
    onClose: () => void
}

export const AddNewCardDialog: React.FC<PropsType> = ({ onClose, open }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const [format, setFormat] = useState<CardDataFormat>(CardDataFormat.text)
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()

    const onCloseHandler = () => {
        formik.resetForm()
        onClose()
    }

    const onChangeFormat = (e: SelectChangeEvent) => {
        setFormat(+e.target.value)
        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: '',
            answerFile: null,
            questionFile: null,
        } as ValuesType,
        validate: (values) => {
            const errors: ErrorsType = {}
            if (format === CardDataFormat.text) {
                if (!values.question) errors.question = 'Required'
                if (!values.answer) errors.answer = 'Required'
            } else if (format === CardDataFormat.image) {
                if (!values.questionFile) errors.questionFile = 'Required'
                if (!values.answerFile) errors.answerFile = 'Required'
            }
            console.log(values, errors)
            return errors
        },
        onSubmit: async (values) => {
            if (packId)
                if (format === CardDataFormat.text) {
                    dispatch(
                        createCardTC({
                            cardsPack_id: packId,
                            question: values.question,
                            answer: values.answer,
                        })
                    )
                } else {
                    if (!values.questionFile || !values.answerFile) return
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
                        labelId="question-format-label"
                        label="Choose a question format"
                        value={format.toString()}
                        onChange={onChangeFormat}
                    >
                        <MenuItem value={CardDataFormat.text}>Text</MenuItem>
                        <MenuItem value={CardDataFormat.image}>Image</MenuItem>
                    </Select>
                    {format === CardDataFormat.image ? (
                        <>
                            <PictureField
                                name="questionFile"
                                onChange={(file) => formik.setFieldValue('questionFile', file)}
                            />
                            <PictureField
                                name="answerFile"
                                onChange={(file) => formik.setFieldValue('answerFile', file)}
                            />
                        </>
                    ) : (
                        <>
                            <TextField
                                name="question"
                                label="Question"
                                variant="standard"
                                value={formik.values.question}
                                onChange={formik.handleChange}
                            />
                            <TextField
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
                            !formik.isValid ||
                            !formik.dirty ||
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
