import React, { ReactNode } from 'react'
import TableCell from '@mui/material/TableCell'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useIsLoading } from 'redux/store'

type PropsType = {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    sortName: string
    sort?: string
    onChangeSort?: (sortName: string) => void
    children: ReactNode
}

export const SortingColumnHead: React.FC<PropsType> = ({
    align,
    sort,
    sortName,
    onChangeSort,
    children,
}) => {
    const isLoading = useIsLoading()

    let direction: 'asc' | 'desc' | undefined
    if (sort) {
        const sortingColumn = sort.slice(1)
        if (sortingColumn === sortName) {
            const directionCode = sort.slice(0, 1)
            if (directionCode === '0') direction = 'asc'
            if (directionCode === '1') direction = 'desc'
        }
    }

    const onSortHandler = () => onChangeSort && onChangeSort(sortName)

    return (
        <TableCell align={align}>
            <TableSortLabel
                active
                disabled={isLoading}
                direction={direction}
                onClick={onSortHandler}
            >
                {children}
            </TableSortLabel>
        </TableCell>
    )
}
