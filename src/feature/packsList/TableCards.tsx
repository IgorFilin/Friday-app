import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";

export const TableCards = () => {
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
    <>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
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
    </>
  );
};
