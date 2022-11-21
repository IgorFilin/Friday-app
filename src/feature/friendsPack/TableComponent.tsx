import * as React from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {RatingComponent} from "./RatingComponent";
import TableSortLabel from "@mui/material/TableSortLabel/TableSortLabel";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {sortCardsAC} from "../../redux/decksReducer";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

export const TableComponent = () => {

    const style = {
        backgroundColor: '#c1bfbf',
    }

    const decks = useAppSelector((state) => state.decks)
    const dispatch = useAppDispatch()
    const sort = useAppSelector(state => state.decks.cardsData.sortPacks)


    const createSortHandler = () => {
        const valueSort = sort === '0updated' ? '1updated' : '0updated'
        dispatch(sortCardsAC(valueSort))
    }

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    width: '100%',
                    margin: '20px auto',
                    backgroundColor: '#f6f6f6',
                }}
                aria-label="customized table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell style={style}>Question</TableCell>
                        <TableCell style={style} align="center">
                            Answer
                        </TableCell>
                        <TableCell style={style} align="right">
                            <TableSortLabel
                                sx={{ml: '5px'}}
                                active={true}
                                IconComponent={ArrowDropDownIcon}
                                onClick={createSortHandler}
                                direction={sort === '0updated' ? 'asc' : 'desc'}
                            >Last Updated</TableSortLabel>
                        </TableCell>
                        <TableCell style={style} align="center">
                            Grade
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {decks.cardsData.cards.map((card) => (
                        <StyledTableRow key={card.question}>
                            <StyledTableCell component="th" scope="row">
                                {card.question}
                            </StyledTableCell>
                            <StyledTableCell align="right">{card.answer}</StyledTableCell>
                            <StyledTableCell align="right">
                                {card.updated.slice(0, 10).split('-').reverse().join('.')}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <RatingComponent/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
