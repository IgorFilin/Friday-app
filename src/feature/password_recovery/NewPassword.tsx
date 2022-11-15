import React from 'react';
import s from "./CheckEmail.module.css";
import { Button, Paper } from "@mui/material";
import { InputPassword } from 'components/InputPassword/InputPassword';
import { useFormik } from 'formik';
import { setNewPassTC } from 'redux/auth-reducer';
import { useAppDispatch } from 'redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { SetNewPasswordType } from 'api/api';

export type FormikErrorType = {
    password?: string;
};

export const NewPassword = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const params = useParams<"token">();
    let token = params.token;

    const handleClickToLogin = () => {
        navigate("/login");
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            resetPasswordToken: token as string
        },
        validate: (values: SetNewPasswordType) => {
            const errors: FormikErrorType = {};
            if (values.password.length <= 3) {
                errors.password = "Password has at least 3 characters";
            }
            return errors;
        },
        onSubmit: ({password, resetPasswordToken}) => {
            dispatch(setNewPassTC({password, resetPasswordToken}))
            formik.resetForm();
        },
    });

    return (
        <div className={s.newPassWrapper}>
            <Paper className={s.newPass} elevation={3}>
                <h2 className={s.h2}>Create new password</h2>
                <InputPassword
                    title={"Password"}
                    name={"password"}
                    valuePassword={formik.values.password}
                    restFormikProps={formik.getFieldProps("password")}
                />
                {formik.errors.password && (
                    <div style={{ color: "red" }}>
                        {formik.errors.password}
                    </div>
                )}
                <p className={s.p}>
                    Create new password and we will send you<br />
                    further instructions to email
                </p>
                <Button type={"submit"} className={s.button} title={"Create new password"}>Create new password</Button>
            </Paper>
        </div>
    );
};