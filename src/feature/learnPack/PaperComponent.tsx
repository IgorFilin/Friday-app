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
                Question: {card.question}
            </Typography>
            <Typography style={{
                marginTop: '70px',
                position: 'absolute',
                marginLeft: '30px',
                fontSize: '15px',
                color: 'grey'
            }}>
                Количество попыток ответов на вопрос: {card.shots}
            </Typography>
            <Typography variant={'h6'} sx={{
                width: '400px',
                marginTop: '120px',
                position: 'absolute',
                marginLeft: '30px',
                overflow: 'hidden',
                color: 'red'
            }}>
                Ответ: {card.answer}
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
