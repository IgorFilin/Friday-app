import React from "react";
import s from "./Registration.module.css";
import { Button, Container, Paper, TextField } from "@mui/material";
import { InputPassword } from "components/InputPassword/InputPassword";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { singUpTC } from "redux/auth-reducer";
import { AppRootReducerType, useAppDispatch } from "redux/store";
import { RequestStatus } from "redux/app-reducer";
import { Link, Navigate } from "react-router-dom";
import { DataFormType } from "api/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Registration = () => {
  const dispatch = useAppDispatch();

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
      dispatch(singUpTC(values));
      formik.resetForm();
    },
    validate(values) {
      const errors: DataFormType = {};

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
        <>
          <Container>
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "60px",
                  width: "100%",
                  height: "100vh",
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: "35px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "38px",
                    width: "413px",
                    height: "528px",
                  }}
                >
                  <Typography
                    sx={{
                      mt: "35px",
                    }}
                    fontWeight={"bold"}
                    variant="h5"
                  >
                    Sing Up
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <TextField
                      sx={{
                        width: "100%",
                        mr: "110px",
                      }}
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
                      <div className={s.errorText}>
                        {formik.errors.password}
                      </div>
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
                    {formik.errors.currPassword &&
                    formik.touched.currPassword ? (
                      <div className={s.errorText}>
                        {formik.errors.currPassword}
                      </div>
                    ) : (
                      <br />
                    )}
                  </Box>
                  <Button type="submit" className={s.button}>
                    Sing Up
                  </Button>
                  <div className={s.toLogIn}>
                    <h3 className={s.textInfo}>Already have an account?</h3>
                    <Link to="/login" className={s.singIn}>
                      Sing In
                    </Link>
                  </div>
                </Paper>
              </Box>
            </form>
          </Container>
        </>
      )}
    </>
  );
};
