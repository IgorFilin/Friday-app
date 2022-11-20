import React, { useEffect } from 'react'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp'
import Box from '@mui/material/Box'
import { ShowPacksCards } from './ShowPacksCards'
import { NumberOfCards } from './NumberOfCards'
import { AddNewPack } from './AddNewPack'
import { InputSearch } from '../../components/InputSearch'
import { TablePacks } from './TablePacks'
import { PaginationPacksList } from './PaginationPacksList'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC } from '../../redux/packs-reducer'
import { RequestStatus } from '../../redux/appReducer'

export const PacksList = () => {
    console.log('PacksList')
    const statusLoading = useAppSelector((state) => state.app.request.status)
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    const page = useAppSelector((state) => state.packsCard.page)
    const pageCount = useAppSelector((state) => state.packsCard.pageCount)
    const minCardsCount = useAppSelector((state) => state.packsCard.minCardsCount)
    const maxCardsCount = useAppSelector((state) => state.packsCard.maxCardsCount)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPacksCardTC())
    }, [sort, minCardsCount, maxCardsCount, pageCount, page])

    return (
        <>
            {' '}
            {!(statusLoading === RequestStatus.loading) && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '50px',
                        width: '100%',
                        height: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '1000px',
                            height: '600px',
                        }}
                    >
                        <AddNewPack />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <InputSearch />
                            <ShowPacksCards />
                            <NumberOfCards />
                            <Box
                                sx={{
                                    alignSelf: 'self-end',
                                    marginBottom: '2px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '36px',
                                        height: '36px',
                                        background: '#FFFFFF',
                                        border: '1px solid #D9D9D9',
                                        borderRadius: '2px',
                                    }}
                                >
                                    <FilterAltSharpIcon />
                                </Box>
                            </Box>
                        </Box>
                        <TablePacks />
                        <PaginationPacksList />
                    </Box>
                </Box>
            )}
        </>
    )
}
