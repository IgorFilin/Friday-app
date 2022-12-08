import React, { useState } from 'react'
import { useIsLoading } from 'redux/store'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useFormik } from 'formik'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { PictureField } from './PictureField'
import TextField from '@mui/material/TextField'
import { PrimaryButton } from 'components/PrimaryButton'

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
}

type PropsType = {
    submitLabel: string
    onSubmit: (format: CardDataFormat, question: string | File, answer: string | File) => void
}

export const CardForm: React.FC<PropsType> = ({ onSubmit, submitLabel }) => {
    const isLoading = useIsLoading()
    const [format, setFormat] = useState<CardDataFormat>(CardDataFormat.text)

    const onChangeFormat = (e: SelectChangeEvent) => {
        setFormat(+e.target.value)
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
            return errors
        },
        onSubmit: (values) => {
            formik.resetForm()
            if (format === CardDataFormat.text) {
                onSubmit(format, values.question, values.answer)
            } else if (format === CardDataFormat.image) {
                if (values.questionFile && values.answerFile)
                    onSubmit(format, values.questionFile, values.answerFile)
            }
        },
    })

    return (
        <FormControl component="form" onSubmit={formik.handleSubmit} size="small" fullWidth>
            <InputLabel id="question-format-label">Choose format</InputLabel>
            <Select
                labelId="question-format-label"
                label="Choose format"
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
                        label="Question"
                        onChange={(file) => formik.setFieldValue('questionFile', file)}
                    />
                    <PictureField
                        name="answerFile"
                        label="Answer"
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
                disabled={!formik.isValid || !formik.dirty || isLoading}
                type="submit"
                sx={{ mb: 2, mt: 3 }}
            >
                {submitLabel}
            </PrimaryButton>
        </FormControl>
    )
}
