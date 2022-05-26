import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

export default function Today() {
    const { avatar, token } = useContext(UserContext);

    React.useEffect(() => {
        if (token.length > 0) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`;
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const promise = axios.get(URL, AUT);
            promise.then((response) => {
                console.log(response);
            }).catch((err) => {
                console.log('errou');
                console.log(err.data);
            });
        }
    }, [token]);

    return (
        <>
            <Header avatar={avatar} />
            <TodayContent />
            <FooterMenu />
        </>
    );
}

function TodayContent() {
    const dateInfo = dayjs().locale('pt-br').format('dddd, DD/MM');
    const date = dateInfo[0].toUpperCase() + dateInfo.substring(1);

    return (
        <TodayStyle>
            <Date>{date}</Date>
            <HabitStats>Nenhum hábito concluído ainda</HabitStats>
            <CardsPlaceToday>
                <HabitToday></HabitToday>
            </CardsPlaceToday>
        </TodayStyle>
    );
}

function HabitToday() {
    const [mark, setMark] = React.useState(false);
    const [background, setBackground] = React.useState("#EBEBEB");

    function MarkToggle() {
        if (mark) {
            setBackground('#EBEBEB');
            setMark(false);
        } else {
            setBackground('#8FC549');
            setMark(true);
        }
    }

    return (
        <HabitStyles>
            <div>
                <h2>Ler 1 capítulo de livro</h2>
                <h3>Sequência atual: 1 dia</h3>
                <h3>Seu recorde: 5 dias</h3>
            </div>
            <MarkStyle onClick={() => MarkToggle()} bg={background}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </MarkStyle>
        </HabitStyles>
    );
}

const TodayStyle = styled.main`
    width: 375px;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background: #E5E5E5;
    margin-top: 70px;
    margin-bottom: 70px;
    overflow: hidden;
    overflow-y: scroll;
    padding: 28px 18px 20px 18px;
`;

const Date = styled.h1`
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: var(--color-dark-blue);
`;

const HabitStats = styled.span`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #BABABA;
`;

const CardsPlaceToday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
`;


const HabitStyles = styled.div`
    display: flex;
    justify-content: space-between;

    width: 340px;
    max-width: 100%;
    height: 94px;

    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 13px 17px 15px;
    color: #666666;

    div {
        display: flex;
        flex-direction: column;
        h2{
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            margin-bottom: 7px;
        }
        h3 {
            font-weight: 400;
            font-size: 12.976px;
            line-height: 16px;
        }
    }
`;

const MarkStyle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 69px;
    height: 69px;
    background: ${(props) => props.bg};
    border: 1px solid #E7E7E7;
    border-radius: 5px;

    ion-icon {
        --ionicon-stroke-width: 66px;
        color: #FFFFFF;
        font-size: 54px;
    }
`;