import React, {memo, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import {Container, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchCardsTC, setLearnCardsTC} from "../../redux/cardsReducer";
import {CardType} from "../../api/types";
import {PaperComponent} from "./PaperComponent";
import {ShowPaper} from "./ShowPaper";
import {KeyboardComponent} from "./KeyboardComponent";
import {RequestStatus} from "../../redux/appReducer";

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        },
        {sum: 0, id: -1}
    )
    return cards[res.id + 1]
}
type LearnPagePropsType = {}


export const LearnPack: React.FC<LearnPagePropsType> = memo(() => {

    const dispatch = useAppDispatch()
    const statusLoading = useAppSelector((state) => state.app.request.status)
    const name = useAppSelector(state => state.cards.packName)
    const cards = useAppSelector(state => state.cards.cards)



    const {id} = useParams<'id'>()

    const [first, setFirst] = useState<boolean>(true)
    const [show, setShow] = useState(false)
    const [gradeValue, setGradeValue] = useState(0)
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        grade: 0,
        shots: 0,
        // questionImg: '',
        packDeckCover: '',
        // answerVideo: '',
        // questionVideo: '',
        // comments: '',
        // type: '',
        // rating: 0,
        // more_id: '',
        created: '',
        updated: '',
        // __v: 0,
    })



    console.log(cards)

    useEffect(() => {
        if (first && id) {
            dispatch(fetchCardsTC(id, 1000))
            setFirst(false)
        }
        if (cards.length > 0) {
            setCard(getCard(cards))
        }
        return () => {
            console.log('LearnContainer useEffect off')
        }
    }, [dispatch, id, cards, first])

    const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGradeValue(+e.currentTarget.value)
    }
    const onClickShowToggle = () => {
        setShow(true)
    }

    const nextPackHandler = async () => {
        await dispatch(setLearnCardsTC(gradeValue, card._id))
        setCard(getCard(cards))
        setShow(false)
        id && dispatch(fetchCardsTC(id, 1000))
    }

    return (
        <>
            {statusLoading === RequestStatus.loading ? (
                <LinearProgress/>
            ) : (
                <>
                    <Container style={{maxWidth: '1000px'}}>
                        <KeyboardComponent/>
                        <Box id="modal-modal-title" component="h2" sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '75px'
                        }}>
                            Learn "{name}" pack
                        </Box>
                        {!show ? <ShowPaper
                                card={card}
                                onClickShowToggle={onClickShowToggle}/> :
                            <PaperComponent
                                card={card}
                                nextPackHandler={nextPackHandler}
                                onChangeRadio={onChangeRadio}
                            />}
                    </Container>
                </>
            )}
        </>
    )
})

