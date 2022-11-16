import React from "react";
import Box from "@mui/material/Box";
import { Pagination, TablePagination } from "@mui/material";

type PaginationPropsType = {
  count: number;
};

export const PaginationCards: React.FC<PaginationPropsType> = ({ count }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Box>
          <Pagination count={count} variant="outlined" shape="rounded" />
        </Box>
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
    </>
  );
};
