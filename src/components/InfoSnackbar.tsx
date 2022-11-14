import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootReducerType } from 'redux/store'
import { setInfo } from 'redux/app-reducer'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
))

export const InfoSnackbar = React.memo(() => {
    const infoMessage = useSelector<AppRootReducerType, string | null>(
        (state) => state.app.request.info
    )
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(setInfo(null))
    }

    return (
        <Snackbar open={!!infoMessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {infoMessage}
            </Alert>
        </Snackbar>
    )
})
