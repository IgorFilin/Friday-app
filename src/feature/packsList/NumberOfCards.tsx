import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";

export const NumberOfCards = () => {
  const [value, setValue] = React.useState<number[]>([0, 100]);

  const handleChange = (event: Event, value: number | number[]) => {
    setValue(value as number[]);
  };
  return (
    <>
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
    </>
  );
};
