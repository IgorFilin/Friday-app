import { Button, Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import s from './PasswordRecovery.module.css';
import {forgotTC} from "../../redux/auth-reducer";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {Navigate, useNavigate} from "react-router-dom";


type FormikErrorType = {
    email: string
}
export type RecoveryEmailType = {
    email: string;
}
export const PasswordRecovery = () => {

    const success = useAppSelector((state) => state.auth.verificationEmail)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Email Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (email) => {
            dispatch(forgotTC(email));
            formik.resetForm();
        }
    })
    
    if (success) return <Navigate to="/check" />;

    const handleClickToLogin = () => {
        navigate("/login");
    }


    return (
        <div className={s.passRecoveryWrapper}>
            <Paper className={s.passRecovery} elevation={3}>
                <h2 className={s.h2}>Forgot your password?</h2>
                <TextField sx={{ m: 1, width: '40ch' }} id="standard-basic" label="Email" variant="standard"
                    {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email ?
                    <div className={s.error}>{formik.errors.email}</div> : null}
                <p className={s.p}>
                    Enter your email address and we will send you further instructions
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <Button className={s.button} type={"submit"} title={"Send Instructions"}>Send Instruction</Button>
                </form>
                <p className={s.pSmall}>
                    Did you remember your password?
                </p>
                <a className={s.pToLogin} onClick={handleClickToLogin}> Try logging in</a>
            </Paper>
        </div>
    );
};

