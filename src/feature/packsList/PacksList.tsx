import React, { useEffect, useMemo } from 'react'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp'
import Box from '@mui/material/Box'
import { ShowPacksCards } from './ShowPacksCards'
import { NumberOfCards } from './NumberOfCards'
import { AddNewPack } from './AddNewPack'
import { InputSearch } from '../../components/InputSearch'
import { TablePacks } from './TablePacks'
import { PaginationPacksList } from './PaginationPacksList'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { RequestStatus } from '../../redux/app-reducer'
import { getPacksCardTC } from '../../redux/packs-reducer'

export const PacksList = () => {
    const statusLoading = useAppSelector((state) => state.app.request.status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPacksCardTC())
    }, [])

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
