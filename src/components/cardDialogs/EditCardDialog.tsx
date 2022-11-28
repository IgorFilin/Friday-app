import React from 'react'
import { useFormik } from 'formik'
import { useAppSelector } from 'redux/store'
import { RequestStatus } from 'redux/appReducer'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DialogWithTitle } from '../DialogWithTitle'
import { PrimaryButton } from '../PrimaryButton'

enum QuestionFormat {
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
    answer: string
    format: QuestionFormat
}

type PropsType = {
    question: string
    answer: string
    open: boolean
    onClose: () => void
    onSubmit: (question: string, answer: string) => void
}

export const EditCardDialog: React.FC<PropsType> = ({
    open,
    question,
    answer,
    onClose,
    onSubmit,
}) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)

    const onCloseHandler = () => {
        formik.resetForm()
        onClose && onClose()
    }

    const formik = useFormik({
        initialValues: {
            question,
            answer,
            format: QuestionFormat.text,
        } as ValuesType,
        validate: (values) => {
            const errors: ErrorsType = {}
            if (!values.question) {
                errors.question = 'Required'
            }
            if (!values.answer) {
                errors.answer = 'Required'
            }
            return errors
        },
        onSubmit: (values) => {
            onSubmit(values.question, values.answer)
            onCloseHandler()
        },
    })

    return (
        <DialogWithTitle
            title={'Edit card'}
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
                        {/*<MenuItem value={QuestionFormat.image}>Image</MenuItem>*/}
                        {/*<MenuItem value={QuestionFormat.video}>Video</MenuItem>*/}
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
                    <PrimaryButton
                        disabled={
                            !(formik.isValid && formik.dirty) ||
                            requestStatus === RequestStatus.loading
                        }
                        type="submit"
                        sx={{ mb: 2, mt: 3 }}
                    >
                        Apply
                    </PrimaryButton>
                </FormControl>
            </Stack>
        </DialogWithTitle>
    )
}
