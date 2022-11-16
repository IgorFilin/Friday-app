import React from "react";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  Pagination,
  Paper,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import TableSortLabel from "@mui/material/TableSortLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ShowPacksCards } from "./ShowPacksCards";
import { NumberOfCards } from "./NumberOfCards";
import { AddNewPack } from "./AddNewPack";

export const PacksList = () => {
  const [orderBy, setOrderBy] = React.useState("calories");
  const [inputValue, setInputValue] = React.useState("");

  function createData(
    Name: string,
    Cards: number,
    LastUpdated: string,
    CreatedBy: string,
    Actions: any
  ) {
    return { Name, Cards, LastUpdated, CreatedBy, Actions };
  }
  const rows = [
    createData("Pack Name", 159, "18.03.2021", "Ivan Ivanov", 111),
    createData("Pack Name", 159, "18.03.2021", "Ivan Ivanov", 111),
    createData("Pack Name", 159, "18.03.2021", "Ivan Ivanov", 111),
    createData("Pack Name", 159, "18.03.2021", "Ivan Ivanov", 111),
    createData("Pack Name", 159, "18.03.2021", "Ivan Ivanov", 111),
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1000px",
          height: "600px",
        }}
      >
        <AddNewPack />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography variant="h6">Search</Typography>
            <TextField
              size={"small"}
              sx={{
                width: "413px",
              }}
              placeholder={"Provide your text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchSharpIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <ShowPacksCards />
          <NumberOfCards />
          <Box
            sx={{
              alignSelf: "self-end",
              marginBottom: "2px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "36px",
                height: "36px",
                background: "#FFFFFF",
                border: "1px solid #D9D9D9",
                borderRadius: "2px",
              }}
            >
              <FilterAltSharpIcon />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#EFEFEF" }}>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Cards</TableCell>
                  <TableCell align="center">
                    Last Updated
                    <TableSortLabel
                      active={true}
                      IconComponent={ArrowDropDownIcon}
                      direction={"desc"}
                    ></TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Created by</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.Name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.Name}</TableCell>
                    <TableCell align="center">{row.Cards}</TableCell>
                    <TableCell align="center">{row.LastUpdated}</TableCell>
                    <TableCell align="right">{row.CreatedBy}</TableCell>
                    <TableCell align="center">{row.Actions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
          }}
        >
          <div>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
          <div>
            <TablePagination
              component="div"
              count={100}
              page={1}
              onPageChange={() => {}}
              rowsPerPage={100}
              onRowsPerPageChange={() => {}}
            />
          </div>
        </Box>
      </Box>
    </Box>
  );
};
