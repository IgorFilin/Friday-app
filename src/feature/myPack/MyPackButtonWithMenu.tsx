import React from 'react'
import IconButton from '@mui/material/IconButton'
import { MyPackMenu } from './MyPackMenu'
import { Popover } from '@mui/material'
import { OptionsIcon } from './OptionsIcon'
import { useNavigate, useParams } from 'react-router-dom'
import { Path } from 'app/AppRoutes'

export const MyPackButtonWithMenu: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const { packId } = useParams<'packId'>()
    const navigate = useNavigate()

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget)
    }

    const onCloseHandler = () => {
        setAnchorEl(null)
    }

    const onMenuHandler = (menuItem: string) => {
        if (menuItem === 'Learn') {
            navigate(Path.learnPack + `/${packId}`)
        }
        if (menuItem === 'Learn') {
            navigate(Path.learnPack + `/${packId}`)
        }
        onCloseHandler()
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
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
