import React from 'react'
import { useAppDispatch } from 'redux/store'
import { deleteCardTC } from 'redux/cardsReducer'
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

    const onAnswerChangedHandler = (id: string, newAnswer: string) => {}

    const onQuestionChangedHandler = (id: string, newAnswer: string) => {}

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
                            row={row}
                            onDelete={onDeleteCardHandler}
                            onAnswerChanged={onAnswerChangedHandler}
                            onQuestionChanged={onQuestionChangedHandler}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
