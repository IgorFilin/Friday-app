import React from 'react';
import Typography from "@mui/material/Typography";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {CardType} from "../../api/types";

type PaperComponentProps = {
    card: CardType,
    onChangeRadio: (e: React.ChangeEvent<HTMLInputElement>) => void
    nextPackHandler: () => void
}

export const PaperComponent = ({card, onChangeRadio, nextPackHandler}: PaperComponentProps) => {

    const questionStartWith = card.question.startsWith('data:image/')
    const answerStartWith = card.answer.startsWith('data:image/')
    const cardShots = card.shots
    const cardAnswer = card.answer
    const cardQuestion = card.question

    return (
        <Paper elevation={3} sx={{
            width: '440px',
            minHeight: '450px',
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
            {questionStartWith ? <Typography style={{
                marginTop: '95px',
                position: 'absolute',
                marginLeft: '30px',
                fontSize: '15px',
                color: 'grey'
            }}>
                Количество попыток ответов на вопрос: {cardShots}
            </Typography> : <Typography style={{
                marginTop: '70px',
                position: 'absolute',
                marginLeft: '30px',
                fontSize: '15px',
                color: 'grey'
            }}>
                Количество попыток ответов на вопрос: {cardShots}
            </Typography>}
            <Typography variant={'h6'} sx={{
                width: '400px',
                marginTop: '115px',
                position: 'absolute',
                marginLeft: '30px',
                overflow: 'hidden',
                color: 'red'
            }}>
                Ответ: {answerStartWith ? <img style={{
                width: '100px',
                height: '90px',
                borderRadius: '5px',
                border: '2px solid black',
                marginLeft: '45px',
                marginTop: '10px'
            }} src={cardAnswer}/> : cardAnswer}
            </Typography>
            <FormControl sx={{
                marginTop: '220px',
                position: 'absolute',
                marginLeft: '30px',
                overflow: 'hidden'
            }}>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    name="radio-buttons-group"
                    onChange={onChangeRadio}>
                    <FormControlLabel value="1" control={<Radio/>} label="не знал"/>
                    <FormControlLabel value="2" control={<Radio/>} label="забыл"/>
                    <FormControlLabel value="3" control={<Radio/>} label="долго думал"/>
                    <FormControlLabel value="4" control={<Radio/>} label="перепутал"/>
                    <FormControlLabel value="5" control={<Radio/>} label="знал"/>
                </RadioGroup>
            </FormControl>
            <Button sx={{
                marginTop: '400px',
                position: 'absolute',
                marginLeft: '270px',
            }} variant={'contained'} onClick={nextPackHandler}>Next</Button>
        </Paper>
    );
};
