import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootReducerType } from "../redux/store";
import { setError } from "../redux/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = React.memo(() => {
  const errorMessage = useSelector<AppRootReducerType, string | null>(
    (state) => state.app.request.error
  );
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    dispatch(setError(null));
  };

  return (
    <Snackbar
      open={!!errorMessage}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
});
