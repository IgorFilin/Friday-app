import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Error } from "./error/Error";
import { Header } from "./header/Header";
import { Test } from "components/test/Test";
import { Login } from "feature/login/Login";
import { CheckEmail } from "../feature/password_recovery/CheckEmail";
import { NewPassword } from "feature/password_recovery/NewPassword";
import { PasswordRecovery } from "feature/password_recovery/Password_recovery";
import { Profile } from "feature/profile/Profile";
import { Registration } from "feature/registration/Registration";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import {
  AppRootReducerType,
  useAppDispatch,
  useAppSelector,
} from "redux/store";

import { initializeAppTC, RequestStatus } from "../redux/app-reducer";
import Box from "@mui/material/Box";

export const App = (): any => {
  const requestStatus = useSelector<AppRootReducerType, RequestStatus>(
    (state) => state.app.request.status
  );

  const isInitialized = useAppSelector((state) => state.app.isInitialized);
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();

  console.log("isInitialized", isInitialized);
  console.log("isLogin", isLogin);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized)
    return (
      <Box
        component={"div"}
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );

  return (
    <div className="App">
      <Header />
      {requestStatus === RequestStatus.loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={"/*"} element={<Error />} />
        <Route path="/password" element={<PasswordRecovery />} />
        <Route path="/entered" element={<NewPassword />} />
        <Route path="/check" element={<CheckEmail />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};
