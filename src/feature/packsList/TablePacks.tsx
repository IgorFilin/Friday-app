import React, { useState } from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import TableSortLabel from '@mui/material/TableSortLabel'
import Box from '@mui/material/Box'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { sortPacksAC } from 'redux/packsReducer'
import { RequestStatus } from 'redux/appReducer'
import { useNavigate } from 'react-router-dom'
import { Path } from 'app/AppRoutes'
import { DeletePackModal } from './modal/DeletePackModal'
import { AddEditPackModal } from './modal/AddEditPackModal'
import imageNotFound from './../../assets/notImage.jpg'

export type iconFlowType = 'read' | 'delete' | 'changed'

export const TablePacks = React.memo(() => {
    const [deletePackModalOpen, setDeletePackModalOpen] = useState(false)
    const [addEditPackModalOpen, setAddEditPackModalOpen] = useState(false)
    const [deletePackModalOpenId, setDeletePackModalOpenId] = useState('')
    const [changePackModalOpenId, setChangePackModalOpenId] = useState('')

    const dispatch = useAppDispatch()

    const cardPacks = useAppSelector((state) => state.packsCard.cardPacks)
    const sort = useAppSelector((state) => state.packsCard.sortPacks)
    const authUserId = useAppSelector((state) => state.auth.profileData.id)
    const requestStatus = useAppSelector((state) => state.app.request.status)

    const hoverStyleIcon = {
        transition: '0.5s',
        cursor: 'pointer',
        '&:hover': { color: '#1976d2', transition: '0.5s' },
    }
    const navigate = useNavigate()

    const onClickIconHandler = (type: iconFlowType, id: string, userId: string) => {
        if (type === 'delete') {
            setDeletePackModalOpenId(id)
            setDeletePackModalOpen(true)
        }
        if (type === 'read') {
            if (id !== userId) navigate(Path.learnPack + '/' + id)
            else navigate(Path.learnPack + '/' + id)
        }
        if (type === 'changed') {
            setChangePackModalOpenId(id)
            setAddEditPackModalOpen(true)
        }
    }

    const onCloseDeletePackModal = () => {
        setDeletePackModalOpen(false)
    }
    const onCloseChangePackModal = () => {
        setAddEditPackModalOpen(false)
    }

    const rows = cardPacks.map((pack) => {
        return {
            userId: pack.user_id,
            key: pack._id,
            name: pack.name,
            cards: pack.cardsCount,
            lastCreated: pack.created.slice(0, 10).split('-').reverse().join('.'),
            createdBy: pack.user_name,
            deckCover: pack.deckCover,
            Actions: [
                {
                    icon: (
                        <SchoolOutlinedIcon
                            onClick={() => onClickIconHandler('read', pack._id, pack.user_id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'allMy',
                },
                {
                    icon: (
                        <ModeEditIcon
                            onClick={() => onClickIconHandler('changed', pack._id, pack.user_id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'my',
                },
                {
                    icon: (
                        <DeleteOutlineIcon
                            onClick={() => onClickIconHandler('delete', pack._id, pack.user_id)}
                            sx={hoverStyleIcon}
                        />
                    ),
                    status: 'my',
                },
            ],
        }
    })

    const createSortHandler = () => {
        const valueSort = sort === '0updated' ? '1updated' : '0updated'
        dispatch(sortPacksAC(valueSort))
    }

    const onNameClickHandler = (id: string, packUserId: string) => {
        if (packUserId !== authUserId) navigate(Path.friendsPack + '/' + id)
        else navigate(Path.myPack + '/' + id)
    }

    return (
        <>
            <Box
                sx={{
                    marginTop: '35px',
                    width: '100%',
                }}
            >
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow hover style={{ backgroundColor: '#EFEFEF' }}>
                                <TableCell align="left">Cover</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Cards</TableCell>
                                <TableCell align="center">
                                    <TableSortLabel
                                        active={!(requestStatus === RequestStatus.loading)}
                                        disabled={requestStatus === RequestStatus.loading}
                                        onClick={createSortHandler}
                                        direction={sort === '0updated' ? 'asc' : 'desc'}
                                    >
                                        Last Created
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">Created by</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.key}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        <img
                                            src={row.deckCover ? row.deckCover : imageNotFound}
                                            style={{ width: '100px' }}
                                            alt="photo"
                                        />
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => onNameClickHandler(row.key, row.userId)}
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.cards}</TableCell>
                                    <TableCell align="center">{row.lastCreated}</TableCell>
                                    <TableCell align="right">{row.createdBy}</TableCell>
                                    <TableCell align="center">
                                        {row.Actions.map((icon, i) => {
                                            if (authUserId === row.userId) {
                                                return (
                                                    <span style={{ padding: '3px' }} key={i}>
                                                        {icon.icon}
                                                    </span>
                                                )
                                            } else if (icon.status === 'allMy') {
                                                return (
                                                    <span style={{ padding: '3px' }} key={i}>
                                                        {icon.icon}
                                                    </span>
                                                )
                                            }
                                        })}
                                    </TableCell>
                                    <DeletePackModal
                                        deletePackModalOpenId={deletePackModalOpenId}
                                        name={row.name}
                                        packId={row.key}
                                        open={deletePackModalOpen}
                                        closeModal={onCloseDeletePackModal}
                                    />
                                    <AddEditPackModal
                                        image={row.deckCover ? row.deckCover : imageNotFound}
                                        changePackModalOpenId={changePackModalOpenId}
                                        name={row.name}
                                        packId={row.key}
                                        open={addEditPackModalOpen}
                                        closeModal={onCloseChangePackModal}
                                        title="Edit pack"
                                    />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
})
