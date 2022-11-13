import React from "react";
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
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { InputPassword } from "../../components/InputPassword/InputPassword";
import { Navigate } from "react-router-dom";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
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
      alert(JSON.stringify(values));
      formik.resetForm();
    },
  });

  return (
    <Box>
      <AppBar color={"inherit"} position="static">
        <Toolbar>
          <img
            style={{ marginLeft: "10%" }}
            src={
              "https://it-incubator.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.8a063c2a.svg&w=256&q=75"
            }
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/*News*/}
          </Typography>
          <Button
            sx={{
              mr: "10%",
              width: "113px",
              borderRadius: 5,
            }}
            variant="contained"
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
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
                  <a style={{ textDecoration: "none" }} href={"/password"}>
                    Forgot Password?
                  </a>
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
              <a href={"/registration"}>Sign Up</a>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};
