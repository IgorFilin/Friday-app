import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BlueButton } from "../../components/BlueButton";

export const AddNewPack = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
          }}
        >
          Packs list
        </Typography>
        <BlueButton>Add new pack</BlueButton>
      </Box>
    </>
  );
};
