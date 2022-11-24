import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import IconButton from '@mui/material/IconButton'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import DeleteIcon from '@mui/icons-material/Delete'

export type PackType = {
    id: string
    question: string
    answer: string
    lastUpdated: string
    grade: number
}

type PropsType = {
    row: PackType
    onDelete: (id: string) => void
    onAnswerChanged: (id: string, newAnswer: string) => void
    onQuestionChanged: (id: string, newQuestion: string) => void
}

export const CardRow: React.FC<PropsType> = ({
    row,
    onDelete,
    onQuestionChanged,
    onAnswerChanged,
}) => {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            </TableCell>
            <TableCell align="right">
                <IconButton onClick={() => setIsEditing((v) => !v)}>
                    <DriveFileRenameOutlineIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
