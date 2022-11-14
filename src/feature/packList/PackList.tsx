import React from "react";
import s from "./PackList.module.css";
import { Button, ButtonGroup, InputAdornment, Slider } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";

export const PackList = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

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
          <div>
            <h4>Search</h4>
            <TextField
              size={"small"}
              className={s.inputSearch}
              placeholder={"Provide your text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchSharpIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <h4>Show packs cards</h4>
            <ButtonGroup
              className={s.buttonGroup}
              disableElevation
              variant="contained"
              aria-label="Disabled elevation buttons"
            >
              <Button className={s.buttonGroup} variant={"outlined"}>
                My
              </Button>
              <Button className={s.buttonGroup}>All</Button>
            </ButtonGroup>
          </div>
          <div>
            <h4>Number of cards</h4>
            <div className={s.sliderGroup}>
              <div className={s.countSlider}>
                <h4>1</h4>
              </div>
              <Slider
                className={s.slider}
                getAriaLabel={() => "range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
              />
              <div className={s.countSlider}>
                <h4>22</h4>
              </div>
            </div>
          </div>
          <div className={s.iconFilter}>
            <div className={s.countSlider}>
              <FilterAltSharpIcon />
            </div>
          </div>
        </div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};
