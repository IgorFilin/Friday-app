import React from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { setSortCardsAC } from 'redux/cardsReducer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { SortingColumnHead } from '../SortingColumnHead'

export const CardsTableHead: React.FC = () => {
    const dispatch = useAppDispatch()
    const sortCards = useAppSelector((state) => state.cards.sortCards)
    const onChangeSortHandler = (sortingName: string) => {
        const sortCode = sortCards?.slice(0, 1)
        const sortName = sortCards?.slice(1)
        let newSortCards
        if (sortName === sortingName) {
            const newSortCode = sortCode === '0' ? '1' : '0'
            newSortCards = newSortCode + sortName
        } else {
            newSortCards = '0' + sortingName
        }
        dispatch(setSortCardsAC(newSortCards))
    }

    return (
        <TableHead>
            <TableRow sx={{ backgroundColor: '#EFEFEF' }}>
                <TableCell>Question</TableCell>
                <TableCell align="center">Answer</TableCell>
                <SortingColumnHead
                    caption={'Last Updated'}
                    sortName={'updated'}
                    align="center"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                />
                <SortingColumnHead
                    caption={'Grade'}
                    sortName={'grade'}
                    align="right"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                />
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
    )
}
