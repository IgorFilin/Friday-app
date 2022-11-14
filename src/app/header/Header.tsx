import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { Navigate, useNavigate } from "react-router-dom";

export const Header = () => {
  let navigate = useNavigate();

  const onClickSingInHandler = () => {
    navigate("/login");
  };

  return (
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
          onClick={onClickSingInHandler}
        >
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};
