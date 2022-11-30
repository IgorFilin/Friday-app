import React, { useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import { CardRow, PackType } from './CardRow'
import { EditCardDialog } from '../cardDialogs/EditCardDialog'
import { DeleteCardDialog } from '../cardDialogs/DeleteCardDialog'
import { CardsTableHead } from './CardsTableHead'

type TablePropsType<T> = {
    rows: T[]
}

export const CardsTable: React.FC<TablePropsType<PackType>> = ({ rows }) => {
    const [EditingCardId, setEditingCardId] = useState<string | null>(null)
    const [DeletingCardId, setDeletingCardId] = useState<string | null>(null)

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
