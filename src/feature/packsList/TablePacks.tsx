import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { sortPacksAC } from '../../redux/packs-reducer'

export const TablePacks = React.memo(() => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((state) => state.packsCard.cardPacks)
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    console.log(sort)
    const rows = cardPacks.map((pack) => {
        return {
            key: pack._id,
            Name: pack.name,
            Cards: pack.cardsCount,
            LastCreated: pack.created.slice(0, 10).split('-').reverse().join('.'),
            CreatedBy: pack.user_name,
            Actions: 1,
        }
    })

    const createSortHandler = () => {
        const valueSort = sort === '0updated' ? '1updated' : '0updated'
        dispatch(sortPacksAC(valueSort))
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '35px',
                    width: '100%',
                }}
            >
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow hover style={{ backgroundColor: '#EFEFEF' }}>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Cards</TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active
                                        onClick={createSortHandler}
                                        direction={sort === '0updated' ? 'asc' : 'desc'}
                                    >
                                        Last Created
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Created by</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.Name}</TableCell>
                                    <TableCell align="center">{row.Cards}</TableCell>
                                    <TableCell align="center">{row.LastCreated}</TableCell>
                                    <TableCell align="right">{row.CreatedBy}</TableCell>
                                    <TableCell align="center">{row.Actions}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
})
