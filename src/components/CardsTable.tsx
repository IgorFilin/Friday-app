import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import { deleteCardTC } from 'redux/cardsReducer'
import { useAppDispatch } from 'redux/store'

export type PackType = {
    id: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

type TablePropsType<T> = {
    packId: string
    rows: T[]
}

export const CardsTable: React.FC<TablePropsType<PackType>> = ({ rows, packId }) => {
    const dispatch = useAppDispatch()

    const onCardDeleteHandler = (cardId: string) => {
        if (!packId) return
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="pack table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#EFEFEF' }}>
                        <TableCell>Question</TableCell>
                        <TableCell align="center">Answer</TableCell>
                        <TableCell align="center">Last Updated</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.question}
                            </TableCell>
                            <TableCell align="center">{row.answer}</TableCell>
                            <TableCell align="center">{row.lastUpdated}</TableCell>
                            <TableCell align="right">
                                <Rating
                                    name="card grade"
                                    value={row.grade}
                                    precision={0.1}
                                    readOnly
                                    emptyIcon={
                                        <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                    }
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton>
                                    <DriveFileRenameOutlineIcon />
                                </IconButton>
                                <IconButton onClick={() => onCardDeleteHandler(row.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
