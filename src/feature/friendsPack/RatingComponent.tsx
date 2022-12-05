import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import {useAppSelector} from "../../redux/store";


export const RatingComponent = () => {
    const decks = useAppSelector((state) => state.decks.cardsState.cards)
    const data = decks.map(el => {
        return {
            rating: el.grade
        }
    })
    const [value, setValue] = React.useState<number | null>(data[0].rating);


    return (
        <Box>
            <Rating
                name="hover-feedback"
                value={value}
                emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
            /></Box>
    );
};
