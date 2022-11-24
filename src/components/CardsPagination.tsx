import React from 'react'
import { AppPagination } from './AppPagination'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { setPageAC, setPageCountAC } from 'redux/cardsReducer'

export const CardsPagination: React.FC = () => {
    const { page, pageCount, cardsTotalCount } = useAppSelector((state) => state.cards)
    const dispatch = useAppDispatch()

    console.log(page, pageCount, cardsTotalCount)

    const setPageHandler = (page: number) => {
        console.log('page', page)
        dispatch(setPageAC(page))
    }

    const setPageCountHandler = (pageCount: number) => {
        console.log('pageCount', pageCount)
        dispatch(setPageCountAC(pageCount))
    }

    return (
        <AppPagination
            page={page}
            rowsPerPage={pageCount}
            totalCount={cardsTotalCount}
            setPage={setPageHandler}
            setPageCount={setPageCountHandler}
        />
    )
}
