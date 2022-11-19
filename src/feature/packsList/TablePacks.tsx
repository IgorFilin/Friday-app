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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Box from '@mui/material/Box'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC, sortPacksAC } from '../../redux/packs-reducer'

export const TablePacks = React.memo(() => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((state) => state.packsCard.cardPacks)

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
        dispatch(sortPacksAC('1updated'))
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
                            <TableRow style={{ backgroundColor: '#EFEFEF' }}>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Cards</TableCell>
                                <TableCell align="center">
                                    Last Created
                                    <TableSortLabel onClick={createSortHandler} direction={'desc'}>
                                        <ArrowDropDownIcon />
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
