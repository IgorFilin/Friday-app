import React, { ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import { QuestionFormat } from './AddNewCardDialog'
import { Button } from '@mui/material'

type PropsType = {
    format: QuestionFormat
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const UniField: React.FC<PropsType> = ({ format, value, onChange }) => {
    switch (format) {
        case QuestionFormat.text:
            return (
                <TextField
                    sx={{ mb: 1, mt: 1 }}
                    id="question"
                    name="question"
                    label="Question"
                    variant="standard"
                    value={value}
                    onChange={onChange}
                />
            )
        case QuestionFormat.image:
            return (
                <label>
                    <input id="question" name="question" hidden type="file" onChange={onChange} />
                    <Button variant="contained" component="span">
                        Change cover
                    </Button>
                    :<div>{value}</div>
                </label>
            )
        default:
            return <></>
    }
}
