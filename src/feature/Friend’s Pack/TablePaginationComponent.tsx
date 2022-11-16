import React from "react";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";

export const TablePaginationComponent = () => {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ display: "flex", width: "1008px", margin: "10px auto" }}>
      {/*<Pagination*/}
      {/*  count={10}*/}
      {/*  color="primary"*/}
      {/*  renderItem={(item) => (*/}
      {/*    <PaginationItem*/}
      {/*      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}*/}
      {/*      {...item}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      <Pagination
        color={"primary"}
        count={10}
        variant="outlined"
        shape="rounded"
      />
      <TablePagination
        sx={{
          mt: -1,
        }}
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
