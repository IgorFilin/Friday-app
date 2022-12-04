import React from "react";
import style from './Error.module.scss'
import {PrimaryButton} from "../../components/PrimaryButton";
import {useNavigate} from "react-router-dom";
import {Path} from "../AppRoutes";

export const Error = () => {
    const navigate = useNavigate()
    const onClickHandler = () => navigate(Path.profile)
    const red = {
        color: 'red'
    }
    return (
        <main className={style.wrapper}>
            <h1>
                <span
                    style={red}>
                    <i>4</i>
                </span>
                <span>
                    <i>0</i>
                </span>
                <span
                    style={red}>
                    <i>4</i>
                </span>
            </h1>
            <h2>Error: 404 page not found</h2>
            <p>Sorry, the page you're looking for cannot be accessed</p>
            <PrimaryButton onClick={onClickHandler}>Back to home page</PrimaryButton>
        </main>
    )
};
