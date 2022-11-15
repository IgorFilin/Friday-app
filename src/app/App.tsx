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

import { initializeAppTC, RequestStatus } from "redux/app-reducer";
import Box from "@mui/material/Box";
import { ErrorSnackbar } from "components/ErrorSnackbar";
import { InfoSnackbar } from "components/InfoSnackbar";

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
                    height: "100vh",
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
                <Route path="/" element={<Navigate to={"/login"} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path={"/*"} element={<Error />} />
                <Route path="/password" element={<PasswordRecovery />} />
                <Route path="/set-new-password/:token" element={<NewPassword />} />
                <Route path="/check" element={<CheckEmail />} />
                <Route path="/test" element={<Test />} />
                <Route path="/pack" element={<PackList />} />
            </Routes>
            <ErrorSnackbar />
            <InfoSnackbar />
        </div>
    );
import { PackList } from "../feature/packList/PackList";
};
