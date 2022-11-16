import React from "react";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";

export const ShowPacksCards = () => {
  const [showPacksCards, setShowPacksCards] = React.useState<"All" | "My">(
    "All"
  );
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Typography variant="h6">Show packs cards</Typography>
        <ButtonGroup
          sx={{
            width: "196px",
            height: "39px",
          }}
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            onClick={() => setShowPacksCards("My")}
            sx={{
              width: "196px",
              height: "39px",
            }}
            variant={showPacksCards === "My" ? "contained" : "outlined"}
          >
            My
          </Button>
          <Button
            onClick={() => setShowPacksCards("All")}
            sx={{
              width: "196px",
              height: "39px",
            }}
            variant={showPacksCards === "All" ? "contained" : "outlined"}
          >
            All
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};
