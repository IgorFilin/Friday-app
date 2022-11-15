import React from "react";
import s from "./PackList.module.css";
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

export const PackList = () => {
  const [value, setValue] = React.useState<number[]>([0, 100]);
  const [orderBy, setOrderBy] = React.useState("calories");
  const [inputValue, setInputValue] = React.useState("");
  const [showPacksCards, setShowPacksCards] = React.useState<"All" | "My">(
    "All"
  );

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
    <div className={s.mainContainer}>
      <div className={s.content}>
        <div className={s.addNewPackContainer}>
          <h2>Packs list</h2>
          <Button className={s.buttonNewPack} variant="contained">
            Add new pack
          </Button>
        </div>
        <div className={s.searchContainer}>
          <div className={s.itemsChildrenContainer}>
            <h4>Search</h4>
            <TextField
              size={"small"}
              className={s.inputSearch}
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
          </div>
          <div className={s.itemsChildrenContainer}>
            <h4>Show packs cards</h4>
            <ButtonGroup
              className={s.buttonGroup}
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button
                onClick={() => setShowPacksCards("My")}
                className={s.buttonGroup}
                variant={showPacksCards === "My" ? "contained" : "outlined"}
              >
                My
              </Button>
              <Button
                onClick={() => setShowPacksCards("All")}
                className={s.buttonGroup}
                variant={showPacksCards === "All" ? "contained" : "outlined"}
              >
                All
              </Button>
            </ButtonGroup>
          </div>
          <div className={s.itemsChildrenContainer}>
            <h4>Number of cards</h4>
            <div className={s.sliderGroup}>
              <div className={s.countSlider}>
                <h4>{value[0]}</h4>
              </div>
              <Slider
                className={s.slider}
                getAriaLabel={() => "range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off"
              />
              <div className={s.countSlider}>
                <h4>{value[1]}</h4>
              </div>
            </div>
          </div>
          <div className={s.iconFilter}>
            <div className={s.countSlider}>
              <FilterAltSharpIcon />
            </div>
          </div>
        </div>
        <div className={s.tableCards}>
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
        </div>
        <div className={s.paginationContainer}>
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
        </div>
      </div>
    </div>
  );
};
