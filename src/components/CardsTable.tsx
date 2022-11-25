import React from 'react'
import { useAppDispatch } from 'redux/store'
import { deleteCardTC, editCardTC } from 'redux/cardsReducer'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { CardRow, PackType } from './CardRow'

type TablePropsType<T> = {
    packId: string
    rows: T[]
}

export const CardsTable: React.FC<TablePropsType<PackType>> = ({ rows, packId }) => {
    const dispatch = useAppDispatch()

    const onDeleteCardHandler = (cardId: string) => {
        if (!packId) return
        dispatch(deleteCardTC(cardId, packId))
    }

    const onEditCardHandler = (id: string, question: string, answer: string) => {
        if (!packId) return
        dispatch(editCardTC(id, question + '-edited question', answer + '-edited answer', packId))
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
                        <CardRow
                            key={row.id}
                            row={row}
                            onDelete={onDeleteCardHandler}
                            onEdit={onEditCardHandler}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
