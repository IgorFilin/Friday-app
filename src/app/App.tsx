import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { initializeAppTC, RequestStatus } from "redux/app-reducer";
import { Header } from "./header/Header";
import { ErrorSnackbar } from "components/ErrorSnackbar";
import { InfoSnackbar } from "components/InfoSnackbar";
import { AppCircularProgress } from "./AppCircularProgress";
import { AppRoutes } from "./AppRoutes";
import Box from "@mui/material/Box";

export const App: React.FC = () => {
  const requestStatus = useAppSelector((state) => state.app.request.status);
  const isInitialized = useAppSelector((state) => state.app.isInitialized);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) return <AppCircularProgress />;

  return (
    <Box>
      <Header />
      {requestStatus === RequestStatus.loading && <AppCircularProgress />}
      <AppRoutes />
      <ErrorSnackbar />
      <InfoSnackbar />
    </Box>
  );
};
