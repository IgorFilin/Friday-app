import React, { useState } from 'react'
import TablePagination from '@mui/material/TablePagination'
import Pagination from '@mui/material/Pagination'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC, setPageAC, setPageCountAC } from '../../redux/packs-reducer'

export const PaginationPacksList = () => {
    const dispatch = useAppDispatch()

    // const page = useAppSelector((state) => state.packsCard.page)
    const pageCount = useAppSelector((state) => state.packsCard.pageCount)
    const page = useAppSelector((state) => state.packsCard.page)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        debugger
        dispatch(setPageAC(newPage))
        dispatch(getPacksCardTC())
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setPageCountAC(+event.target.value))
        dispatch(getPacksCardTC())
    }

    return (
        <div style={{ display: 'flex', width: '100%', margin: '10px auto' }}>
            <Pagination color={'primary'} count={5} variant="outlined" shape="rounded" />
            <TablePagination
                sx={{
                    mt: -1,
                }}
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageCount}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}
