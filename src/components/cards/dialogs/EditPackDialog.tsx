import React from 'react'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { RequestStatus } from 'redux/appReducer'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DialogWithTitle } from '../../DialogWithTitle'
import { PrimaryButton } from '../../PrimaryButton'
import { changePackTC } from 'redux/packsReducer'
import { useParams } from 'react-router-dom'

type ErrorsType = {
    name?: string
}

type ValuesType = {
    name: string
}

type PropsType = {
    open: boolean
    onClose: () => void
}

export const EditPackDialog: React.FC<PropsType> = ({ open, onClose }) => {
    const requestStatus = useAppSelector((state) => state.app.request.status)
    const dispatch = useAppDispatch()
    const { packId } = useParams<'packId'>()
    const packName = useAppSelector((state) => state.cards.packName)

    const formik = useFormik({
        initialValues: {
            name: packName,
        } as ValuesType,
        validate: (values) => {
            const errors: ErrorsType = {}
            if (!values.name) {
                errors.name = 'Required'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(changePackTC({ _id: packId ?? '', name: values.name }, true))
            onCloseHandler()
        },
        enableReinitialize: true,
    })

    const onCloseHandler = () => {
        formik.resetForm()
        onClose()
    }

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
                    <TextField
                        sx={{ mb: 1, mt: 1 }}
                        id="name"
                        name="name"
                        label="Pack name"
                        variant="standard"
                        value={formik.values.name}
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
