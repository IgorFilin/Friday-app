import React, { useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { CardRow } from './CardRow'
import { EditCardDialog } from './dialogs/EditCardDialog'
import { DeleteCardDialog } from './dialogs/DeleteCardDialog'
import { CardsTableHead } from './CardsTableHead'
import { useAppSelector } from 'redux/store'

// const StyledTable = styled(Table)(({ theme }) => ({
//     [`&.${tableClasses.root}`]: {
//         borderRadius: '20px',
//     },
// }))

export const CardsTable: React.FC = () => {
    const [EditingCardId, setEditingCardId] = useState<string | null>(null)
    const [DeletingCardId, setDeletingCardId] = useState<string | null>(null)
    const cards = useAppSelector((state) => state.cards.cards)

    const rows = cards.map((c) => ({
        id: c._id,
        question: c.question,
        answer: c.answer,
        lastUpdated: c.updated,
        grade: c.grade,
    }))

    return (
        <>
            <EditCardDialog cardId={EditingCardId} onClose={() => setEditingCardId(null)} />
            <DeleteCardDialog cardId={DeletingCardId} onClose={() => setDeletingCardId(null)} />
            <TableContainer component={Paper}>
                <Table size="small" aria-label="pack table">
                    <CardsTableHead />
                    <TableBody>
                        {rows.map((row) => (
                            <CardRow
                                key={row.id}
                                row={row}
                                onEdit={setEditingCardId}
                                onDelete={setDeletingCardId}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
