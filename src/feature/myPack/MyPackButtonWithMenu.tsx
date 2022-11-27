import React from 'react'
import IconButton from '@mui/material/IconButton'
import {MyPackMenu} from './MyPackMenu'
import {Popover} from '@mui/material'
import {OptionsIcon} from './OptionsIcon'

export const MyPackButtonWithMenu: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
	
	const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget)
	}
	
	const onCloseHandler = () => {
		setAnchorEl(null)
	}
	
	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined
	
	return (
		<>
			<IconButton aria-describedby={id} onClick={onClickHandler}>
				<OptionsIcon/>
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
				<MyPackMenu onMenuClick={onCloseHandler}/>
			</Popover>
		</>
	)
}
