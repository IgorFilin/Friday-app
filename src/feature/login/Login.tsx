import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useFormik } from "formik";
import { InputPassword } from "../../components/InputPassword/InputPassword";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../redux/auth-reducer";
import { AppRootReducerType } from "../../redux/store";
import { Link, Navigate } from "react-router-dom";
import { ErrorSnackbar } from "../../components/ErrorSnackbar";

export type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector<AppRootReducerType, boolean>(
    (state) => state.auth.isLogin
  );
  const error = useSelector<AppRootReducerType, string | null>(
    (state) => state.app.request.error
  );

  useEffect(() => {
    if (!isLogin) {
      return;
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (values.password.length <= 3) {
        errors.password = "Password has at least 3 characters";
      }
      return errors;
    },
    onSubmit: (values) => {
      // @ts-ignore
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });
  if (isLogin) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <Box>
      {error && <ErrorSnackbar />}
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 7,
            width: 413,
            height: 600,
            backgroundColor: "#eaeaea",
          }}
        >
          <Stack sx={{ m: 3, alignItems: "center" }}>
            <Typography
              sx={{
                mt: "35px",
              }}
              fontWeight={"bold"}
              variant="h5"
            >
              Sign in
            </Typography>
            <Box margin={2}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormGroup>
                    <TextField
                      sx={{
                        width: "100%",
                        mr: "110px",
                      }}
                      label="Email"
                      margin="normal"
                      variant={"standard"}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.errors.email && (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}
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
                    <FormControlLabel
                      sx={{
                        mt: "24px",
                      }}
                      label={"Remember me"}
                      control={
                        <Checkbox
                          checked={formik.values.rememberMe}
                          {...formik.getFieldProps("rememberMe")}
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
                <Typography
                  sx={{
                    ml: "60%",
                  }}
                  fontWeight={"bold"}
                  variant="inherit"
                >
                  <Link style={{ textDecoration: "none" }} to={"/password"}>
                    Forgot Password?
                  </Link>
                </Typography>
                <Button
                  type={"submit"}
                  variant={"contained"}
                  sx={{
                    mt: "80px",
                    width: "95%",
                    borderRadius: 5,
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Sign in
                </Button>
              </form>
            </Box>
            <Typography
              sx={{
                mt: "31px",
                color: "grey",
              }}
              fontWeight={"bold"}
              variant="inherit"
            >
              Already have an account?
            </Typography>
            <Typography
              sx={{
                mt: "11px",
                color: "#366EFF",
              }}
              fontWeight={"bold"}
              variant="inherit"
            >
              <Link to={"/registration"}>Sign Up</Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
