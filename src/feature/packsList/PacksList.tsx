import React, { useEffect } from 'react'
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp'
import Box from '@mui/material/Box'
import { ShowPacksCards } from './ShowPacksCards'
import { NumberOfCards } from './NumberOfCards'
import { AddNewPack } from './AddNewPack'
import { TablePacks } from './TablePacks'
import { PaginationPacksList } from './PaginationPacksList'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getPacksCardTC } from '../../redux/packsReducer'
import { InputSearchPacksCard } from './InputSearchPacksCard'

export const PacksList = () => {
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    const page = useAppSelector((state) => state.packsCard.page)
    const pageCount = useAppSelector((state) => state.packsCard.pageCount)
    const max = useAppSelector((state) => state.packsCard.slider.max)
    const min = useAppSelector((state) => state.packsCard.slider.min)
    const packName = useAppSelector((state) => state.packsCard.packName)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPacksCardTC())
    }, [sort, max, min, pageCount, page, packName])

    return (
        <>
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
                        width: '1000px',
                        height: '600px',
                    }}
                >
                    <AddNewPack />
                    <Box
                        sx={{
                            marginTop: '30px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <InputSearchPacksCard />
                        <ShowPacksCards />
                        <NumberOfCards />
                        <Box
                            sx={{
                                marginTop: '30px',
                                alignSelf: 'self-end',
                                marginBottom: '2px',
                            }}
                        >
                            <Box
                                sx={{
                                    marginTop: '30px',
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
            )
        </>
    )
}
