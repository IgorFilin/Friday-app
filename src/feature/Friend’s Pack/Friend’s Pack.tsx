import React from "react";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button/Button";
import { SearchInput } from "./SearchInput";
import { TableComponent } from "./TableComponent";
import Stack from "@mui/material/Stack";
import { TablePaginationComponent } from "./TablePaginationComponent";

export const FriendSPack = () => {
  return (
    <Box>
      <Box style={{ width: "1008px", margin: "0 auto" }}>
        <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
          <KeyboardReturnRoundedIcon sx={{ mt: 2 }} /> Back to Packs List
        </Link>
      </Box>
      <Box style={{ width: "1008px", margin: "20px auto" }}>
        <Typography
          variant={"h6"}
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Friend’s Pack
          <Button sx={{ borderRadius: 10, fontSize: 12 }} variant={"contained"}>
            Learn to pack
          </Button>
        </Typography>
        <Typography style={{ width: "1008px", margin: "10px auto" }}>
          Search
        </Typography>
      </Box>
      <SearchInput />
      <TableComponent />
      <Stack sx={{ width: "1008px", margin: "0 auto" }} spacing={2}></Stack>
      <TablePaginationComponent />
    </Box>
  );
};
