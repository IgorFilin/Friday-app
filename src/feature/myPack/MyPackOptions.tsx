import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { MyPackMenu } from './MyPackMenu'
import { Popover } from '@mui/material'
import { OptionsIcon } from './OptionsIcon'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'app/AppRoutes'
import { useAppDispatch } from 'redux/store'
import { deletePackTC } from 'redux/packsReducer'
import { EditPackDialog } from 'components/cards/dialogs/EditPackDialog'

export const MyPackOptions: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const { packId } = useParams<'packId'>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isEditPackOpen, setIsEditPackOpen] = useState(false)

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const onCloseHandler = () => {
        setAnchorEl(null)
    }

    const onMenuHandler = (menuItem: string) => {
        if (packId) {
            if (menuItem === 'Learn') {
                navigate(Path.learnPack + '/' + packId)
            }
            if (menuItem === 'Delete') {
                dispatch(deletePackTC(packId)).then(() => {
                    navigate(Path.packsList)
                })
            }
            if (menuItem === 'Edit') {
                setIsEditPackOpen(true)
            }
        }

        onCloseHandler()
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <EditPackDialog open={isEditPackOpen} onClose={() => setIsEditPackOpen(false)} />
            <IconButton aria-describedby={id} onClick={onClickHandler}>
                <OptionsIcon />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onCloseHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <MyPackMenu onMenuClick={onMenuHandler} />
            </Popover>
        </>
    )
}
