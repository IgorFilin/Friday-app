import React from "react";
// import './App.css';

import { Route, Routes } from "react-router-dom";
import { Error } from "./error/Error";
import { Header } from "./header/Header";
import { Test } from "../components/test/Test";
import { Login } from "../feature/login/Login";
import { NewPassword } from "../feature/password_recovery/NewPassword";
import { PasswordRecovery } from "../feature/password_recovery/Password_recovery";
import { Profile } from "../feature/profile/Profile";
import { Registration } from "../feature/registration/Registration";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootReducerType } from "../redux/store";
import { RequestStatus } from "../redux/app-reducer";
import {CheckEmail} from "../feature/password_recovery/CheckEmail";

export const App = (): any => {
  const statusLoading = useSelector<AppRootReducerType, RequestStatus>(
    (state) => state.app.request.status
  );

  return (
    <div className="App">
      <Header />
      {statusLoading === RequestStatus.loading && (
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
        <Route path="/check" element={<CheckEmail />} />
        <Route path="/entered" element={<NewPassword />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};
