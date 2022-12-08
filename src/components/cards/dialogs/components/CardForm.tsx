import React, { useState } from 'react'
import { useIsLoading } from 'redux/store'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useFormik } from 'formik'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { PictureField } from 'components/PictureField'
import TextField from '@mui/material/TextField'
import { PrimaryButton } from 'components/PrimaryButton'
import { isBase64 } from 'utils'

type ErrorsType = {
    question?: string
    answer?: string
}

type ValuesType = {
    question: string
    answer: string
}

export enum CardDataFormat {
    text,
    image,
}

type PropsType = {
    question?: string
    answer?: string
    submitLabel: string
    onSubmit: (question: string, answer: string) => void
}

export const CardForm: React.FC<PropsType> = ({ onSubmit, submitLabel, answer, question }) => {
    const isLoading = useIsLoading()
    let startFormat = CardDataFormat.text
    if (question && isBase64(question)) startFormat = CardDataFormat.image

    const [selectedFormat, setSelectedFormat] = useState<CardDataFormat>(startFormat)

    const onChangeFormat = (e: SelectChangeEvent) => {
        setSelectedFormat(+e.target.value)
        formik.resetForm({ values: { question: '', answer: '' } })
    }

    const formik = useFormik({
        initialValues: {
            question: question ?? '',
            answer: answer ?? '',
        } as ValuesType,
        validate: (values) => {
            const errors: ErrorsType = {}
            if (!values.question) errors.question = 'Required'
            if (!values.answer) errors.answer = 'Required'
            return errors
        },
        onSubmit: (values) => {
            onSubmit(values.question, values.answer)
        },
    })

    return (
        <FormControl component="form" onSubmit={formik.handleSubmit} size="small" fullWidth>
            <>
                <InputLabel id="question-format-label">Choose format</InputLabel>
                <Select
                    labelId="question-format-label"
                    label="Choose format"
                    value={selectedFormat.toString()}
                    onChange={onChangeFormat}
                >
                    <MenuItem value={CardDataFormat.text}>Text</MenuItem>
                    <MenuItem value={CardDataFormat.image}>Image</MenuItem>
                </Select>
            </>

            {selectedFormat === CardDataFormat.image ? (
                <>
                    <PictureField
                        name="question"
                        label="Question"
                        value={formik.values.question}
                        onChange={(file) => formik.setFieldValue('question', file)}
                    />
                    <PictureField
                        name="answer"
                        label="Answer"
                        value={formik.values.answer}
                        onChange={(file) => formik.setFieldValue('answer', file)}
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
