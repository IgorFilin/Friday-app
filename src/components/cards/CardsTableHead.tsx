import React from 'react'
import {useAppDispatch, useAppSelector} from 'redux/store'
import {setSortCardsAC} from 'redux/cardsReducer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import {SortingColumnHead} from '../SortingColumnHead'
import {Path} from "../../app/AppRoutes";
import {Link, useParams} from "react-router-dom";

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
            <TableRow sx={{backgroundColor: '#EFEFEF'}}>
                <SortingColumnHead
                    sortName={'question'}
                    align="left"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                >
                    Question
                </SortingColumnHead>

                <SortingColumnHead
                    sortName={'answer'}
                    align="center"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                >
                    Answer
                </SortingColumnHead>

                <SortingColumnHead
                    sortName={'updated'}
                    align="center"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                >
                    Last Updated
                </SortingColumnHead>

                <SortingColumnHead
                    sortName={'grade'}
                    align="right"
                    sort={sortCards}
                    onChangeSort={onChangeSortHandler}
                >
                    Grade
                </SortingColumnHead>

                <TableCell align="right"></TableCell>
            </TableRow>
        </TableHead>
    )
}
