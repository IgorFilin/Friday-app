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

export const PacksList = () => {
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [orderBy, setOrderBy] = React.useState("calories");
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event: Event, value: number | number[]) => {
    setValue(value as number[]);
  };
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Typography variant="h6">Number of cards</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexDirection: "row",
                alignItems: "center",
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
                  margin: "0 15px 0 0",
                }}
              >
                <Typography>{value[0]}</Typography>
              </Box>
              <Slider
                sx={{
                  width: "155px",
                }}
                getAriaLabel={() => "range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off"
              />
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
                  margin: "0 0 0 15px",
                }}
              >
                <Typography>{value[1]}</Typography>
              </Box>
            </Box>
          </Box>
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
