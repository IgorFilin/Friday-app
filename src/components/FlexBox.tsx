import React from "react";
import Box, { BoxProps } from "@mui/material/Box";

export const FlexBox: React.FC<BoxProps> = (props) =>
  <Box display="flex" {...props} />
