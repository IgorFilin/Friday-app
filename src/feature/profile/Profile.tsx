import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import avatar from "assets/cat.jpg";
import Box from "@mui/material/Box";
import { ErrorSnackbar } from "components/ErrorSnackbar";
import { LogOutButton } from "./LogOutButton";
import { UserAvatar } from "./UserAvatar";
import { UserEmail } from "./UserEmail";
import { EditableUserName } from "./EditableUserName";

export const Profile = () => {
  const { name, email } = { email: "j&johnson@gmail.com", name: "Ivan" };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <ErrorSnackbar />
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 7,
          width: 400,
          height: 350,
        }}
      >
        <Stack sx={{ m: 3, alignItems: "center" }}>
          <Typography fontWeight={"bold"} variant="h5">
            Personal Information
          </Typography>
          <Box margin={2}>
            <UserAvatar src={avatar} />
          </Box>
          <EditableUserName value={name} onConfirm={console.log} />
          <UserEmail email={email} />
          <LogOutButton />
        </Stack>
      </Paper>
    </Container>
  );
};
