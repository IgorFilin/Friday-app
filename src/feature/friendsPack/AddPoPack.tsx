import React from 'react';
import {Button} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";

export const AddToPack = () => {
    return (
        <>
            <AppBar
                color={'inherit'}
                position="static"
                sx={{
                    pl: '10%',
                    pr: '10%',
                    boxShadow:
                        '0 4px 18px rgb(54 110 255 / 35%), inset 0 1px 0 hsl(0deg 0% 100% / 30%)',
                }}
            >

            </AppBar>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '150px'
            }}>This pack is empty. Click on the button and return to the list of packs
            </Box>
            <Link
                style={{textDecoration: 'none'}}
                to={'/packslist'}>
                <Button variant={'contained'} sx={{
                    marginLeft: '700px',
                    marginTop: '20px',
                    w: 20,
                    borderRadius: 5,
                    textTransform: 'none',
                }}>
                    Back to packslist
                </Button>
            </Link>
        </>
    )
}
