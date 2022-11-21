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
import { RequestStatus } from '../../redux/appReducer'
import {setCardsTC} from "../../redux/decksReducer";
import {Link} from "react-router-dom";

export const TablePacks = React.memo(() => {
    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector((state) => state.packsCard.cardPacks)
    const sort = useAppSelector((state) => state.packsCard.sortPacks)

    const requestStatus = useAppSelector((state) => state.app.request.status)

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

    const onClickUserHandler = (id: string) => {
        // dispatch(setCardsTC(id))
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
                            {requestStatus === RequestStatus.loading
                                ? [1].map((el, i) => {
                                      return (
                                          <TableRow
                                              key={i}
                                              sx={{
                                                  '&:last-child td, &:last-child th': { border: 0 },
                                              }}
                                          >
                                              <TableCell align="left">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                              <TableCell align="right">...loading</TableCell>
                                              <TableCell align="center">...loading</TableCell>
                                          </TableRow>
                                      )
                                  })
                                : rows.map((row) => (
                                      <TableRow
                                          key={row.key}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                          <TableCell align="left">
                                              <Link to={`friendspack/${row.key}`}>{row.Name}</Link>
                                          </TableCell>
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
