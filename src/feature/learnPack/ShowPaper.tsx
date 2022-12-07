import React from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {CardType} from "../../api/types";
import {text} from "stream/consumers";

type ShowPaperProps = {
    card: CardType,
    onClickShowToggle: () => void
}

export const ShowPaper = ({card, onClickShowToggle}: ShowPaperProps) => {

    const questionStartWith = card.question.startsWith('data:image/')
    const cardShots = card.shots
    const cardQuestion = card.question

    return (
        <Paper elevation={3} sx={{
            width: '440px',
            minHeight: '200px',
            marginLeft: '25%',
            boxSizing: 'border-box',

        }}>
            <Typography variant={'h6'} sx={{
                marginTop: '30px',
                position: 'absolute',
                marginLeft: '30px',
                color: 'green'
            }}>
                Question: {questionStartWith ? <img style={{
                width: '100px',
                height: '80px',
                borderRadius: '5px',
                border: '2px solid black',
                marginTop: '-20px',
                marginLeft: '20px'
            }} src={cardQuestion}/> : cardQuestion}
            </Typography>
            {questionStartWith ? <Typography variant={'h6'} sx={{
                marginTop: '110px',
                position: 'absolute',
                marginLeft: '30px',
                fontSize: '15px',
                color: 'grey'
            }}>
                Количество попыток ответов на вопрос: {cardShots}
            </Typography> : <Typography variant={'h6'} sx={{
                marginTop: '70px',
                position: 'absolute',
                marginLeft: '30px',
                fontSize: '15px',
                color: 'grey'
            }}>
                Количество попыток ответов на вопрос: {cardShots}
            </Typography>}
            <Button sx={{
                marginTop: '150px',
                position: 'absolute',
                marginLeft: '150px',
            }} variant={'contained'} onClick={onClickShowToggle}>Show answer</Button>
        </Paper>
    );
};

