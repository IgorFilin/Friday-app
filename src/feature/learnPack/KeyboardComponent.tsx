import React from 'react';
import {Link} from "react-router-dom";
import KeyboardReturnRoundedIcon from "@mui/icons-material/KeyboardReturnRounded";


export const KeyboardComponent = () => {
    return (
        <Link
            to={'/packslist'}
            style={{textDecoration: 'none', color: 'black'}}
        >
            <KeyboardReturnRoundedIcon sx={{mt: 2}}/> Back to Packs List
        </Link>
    );
};
