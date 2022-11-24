import React from 'react'
import TablePagination from '@mui/material/TablePagination'
import Pagination from '@mui/material/Pagination'

type PropsType = {
    rowsPerPage: number
    page: number
    totalCount: number
    setPageCount: (newPageCount: number) => void
    setPage: (newPageCount: number) => void
}

export const AppPagination: React.FC<PropsType> = ({
    totalCount,
    rowsPerPage,
    page,
    setPage,
    setPageCount,
}) => {
    const onChangePageStepHandler = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        console.log('newPage', newPage)

        setPage(newPage)
    }

    const onChangeRowsPerPageHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPageCount(parseInt(event.target.value, 10))
    }

    const onChangePageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }

    const pc = Math.floor(totalCount / rowsPerPage) + 1
    return (
        <div style={{ display: 'flex', width: '100%', margin: '10px auto' }}>
            <Pagination
                color={'primary'}
                count={pc}
                variant="outlined"
                shape="rounded"
                page={page}
                defaultPage={1}
                onChange={onChangePageHandler}
            />
            <TablePagination
                component="div"
                count={totalCount}
                page={page}
                sx={{ mt: -1 }}
                onPageChange={onChangePageStepHandler}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onChangeRowsPerPageHandler}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    )
}
