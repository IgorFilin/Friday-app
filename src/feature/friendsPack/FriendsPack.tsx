import React from 'react'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { TableComponent } from './TableComponent'
import Stack from '@mui/material/Stack'
import { TablePaginationComponent } from '../../components/TablePaginationComponent'
import { InputSearch } from '../../components/InputSearch'
import Container from '@mui/material/Container'
import { BlueButton } from '../../components/BlueButton'

export const FriendsPack = () => {
    return (
        <Container sx={{ maxWidth: '1008px' }}>
            <Box style={{ width: '100%', margin: '0 auto' }}>
                <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>
                    <KeyboardReturnRoundedIcon sx={{ mt: 2 }} /> Back to Packs List
                </Link>
            </Box>
            <Box
                style={{
                    width: '100%',
                }}
            >
                <Typography
                    variant={'h6'}
                    style={{
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    Friend’s Pack
                    <BlueButton>Learn to pack</BlueButton>
                </Typography>
            </Box>
            <InputSearch />
            <TableComponent />
            <Stack sx={{ width: '100%', margin: '0 auto' }} spacing={2}></Stack>
            <TablePaginationComponent />
        </Container>
    )
}
