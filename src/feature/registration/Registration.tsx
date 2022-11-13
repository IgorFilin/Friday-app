import React from "react";
import s from "./Registration.module.css";
import { Button, CircularProgress, Paper, TextField } from "@mui/material";
import { InputPassword } from "components/InputPassword/InputPassword";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SingUpTC } from "redux/auth-reducer";
import { AppDispatch, AppRootReducerType } from "redux/store";
import { ErrorSnackbar } from "../../components/ErrorSnackbar";
import { RequestStatus } from "../../redux/app-reducer";
import { Link, Navigate } from "react-router-dom";

export type dataFormType = {
  email?: string;
  password?: string;
  currPassword?: string;
};

export const Registration = () => {
  const dispatch = useDispatch<AppDispatch>();
  const statusLoading = useSelector<AppRootReducerType, RequestStatus>(
    (state) => state.app.request.status
  );
  const isSingUpStatus = useSelector<AppRootReducerType, boolean>(
    (state) => state.auth.isSingUp
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      currPassword: "",
    },
    onSubmit: (values) => {
      dispatch(SingUpTC(values));
      formik.resetForm();
    },
    validate(values) {
      const errors: dataFormType = {};

      if (values.password !== values.currPassword) {
        errors.currPassword = "Confirmed password should match the password";
      } else if (!values.currPassword) {
        errors.currPassword = "Confirm password required";
      }
      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length <= 7) {
        errors.password = "Password must be more than 7 characters";
      }
      if (!values.email) {
        errors.email = "Email required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
  });

  if (isSingUpStatus) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {!(statusLoading === RequestStatus.loading) && (
        <form onSubmit={formik.handleSubmit}>
          <div className={s.mainContainer}>
            <Paper elevation={2}>
              <div className={s.content}>
                <h1 className={s.title}>Sing Up</h1>
                <div className={s.groupInputs}>
                  <TextField
                    className={s.input}
                    label="Email"
                    {...formik.getFieldProps("email")}
                    variant="standard"
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className={s.errorText}>{formik.errors.email}</div>
                  ) : (
                    <br />
                  )}

                  <InputPassword
                    name={"password"}
                    title={"Password"}
                    valuePassword={formik.values.password}
                    onChange={formik.handleChange}
                    restFormikProps={formik.getFieldProps("password")}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className={s.errorText}>{formik.errors.password}</div>
                  ) : (
                    <br />
                  )}

                  <InputPassword
                    name={"currPassword"}
                    title={"Confirm password"}
                    valuePassword={formik.values.currPassword}
                    onChange={formik.handleChange}
                    restFormikProps={formik.getFieldProps("currPassword")}
                  />
                  {formik.errors.currPassword && formik.touched.currPassword ? (
                    <div className={s.errorText}>
                      {formik.errors.currPassword}
                    </div>
                  ) : (
                    <br />
                  )}
                </div>
                <Button type="submit" className={s.button}>
                  Sing Up
                </Button>
                <div className={s.toLogIn}>
                  <h3 className={s.textInfo}>Already have an account?</h3>
                  <Link to="/login" className={s.singIn}>
                    Sing In
                  </Link>
                </div>
              </div>
            </Paper>
          </div>
        </form>
      )}
      <ErrorSnackbar />
    </>
  );
};
