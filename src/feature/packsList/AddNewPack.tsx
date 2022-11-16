import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

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
        <Button
          sx={{
            alignSelf: "center",
            width: "175px",
            height: "36px",
            background: "#366EFF",
            boxShadow:
              "0px 4px 18px rgba(54, 110, 255, 0.35), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
            borderRadius: "30px",
          }}
          variant="contained"
        >
          Add new pack
        </Button>
      </Box>
    </>
  );
};
