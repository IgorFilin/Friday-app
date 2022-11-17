import React from 'react'
import { useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { BackToPacksListButton } from 'components/BackToPacksListButton'
import { BlueButton } from 'components/BlueButton'
import { InputSearch } from 'components/InputSearch'
import { TablePaginationComponent } from 'components/TablePaginationComponent'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'

export const MyPack: React.FC = () => {
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    if (!isLogin) return <Navigate to="/login" />

    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                // bgcolor: '#cfe8fc',
            }}
        >
            <Stack width={'100%'} sx={{ m: 3, alignItems: 'center' }}>
                <Box width={'100%'} marginBottom={2}>
                    <BackToPacksListButton />
                </Box>
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                >
                    <Typography variant={'h5'}>My Pack</Typography>
                    <BlueButton>Add new card</BlueButton>
                </Box>
                <InputSearch width={'100%'} />
                <PackTable />

                <TablePaginationComponent />
            </Stack>
        </Container>
    )
}

export const PackTable: React.FC<{ data: any[] }> = ({ data }) => {
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number
    ) {
        return { name, calories, fat, carbs, protein }
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="pack table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
