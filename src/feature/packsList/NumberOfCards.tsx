import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Slider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setMinMaxValueAC } from '../../redux/packs-reducer'

export const NumberOfCards = () => {
    // const [value, setValue] = useState<string>('')
    // const debouncedValue = useDebounce<string>(value, 500)
    //
    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value)
    // }
    //
    // // Fetch API (optional)
    // useEffect(() => {
    //     // Do fetch here...
    //     // Triggers when "debouncedValue" changes
    // }, [debouncedValue])

    const min = useAppSelector((state) => state.packsCard.minCardsCount)
    const max = useAppSelector((state) => state.packsCard.maxCardsCount)

    const dispatch = useAppDispatch()

    const handleChange = (event: Event, value: number | number[]) => {
        // @ts-ignore
        dispatch(setMinMaxValueAC(value[0], value[1]))
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}
            >
                <Typography variant="h6">Number of cards</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        flexDirection: 'row',
                        alignItems: 'center',
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
                            margin: '0 15px 0 0',
                        }}
                    >
                        <Typography>{min}</Typography>
                    </Box>
                    <Slider
                        sx={{
                            width: '155px',
                        }}
                        getAriaLabel={() => 'range'}
                        value={[min, max]}
                        onChange={handleChange}
                        valueLabelDisplay="off"
                    />
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
                            margin: '0 0 0 15px',
                        }}
                    >
                        <Typography>{max}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
