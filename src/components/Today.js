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
    const [cardsArray, setCardsArray] = React.useState([]);
    const [update, setUpdate] = React.useState(false);


    React.useEffect(() => {
        if (token.length > 0) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`;
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const promise = axios.get(URL, AUT);
            promise.then((response) => {
                setCardsArray(response.data);
            }).catch((err) => {
                console.log('errou');
                console.log(err.data);
            });
        }
    }, [token, update]);

    return (
        <>
            <Header avatar={avatar} />
            <TodayContent cardsArray={cardsArray} update={update} setUpdate={setUpdate} />
            <FooterMenu />
        </>
    );
}

function TodayContent({ cardsArray, update, setUpdate }) {
    const { percentage, setPercentage } = useContext(UserContext);
    const dateInfo = dayjs().locale('pt-br').format('dddd, DD/MM');
    const date = dateInfo[0].toUpperCase() + dateInfo.substring(1);

    React.useEffect(() => {
        const CompletedHabits = cardsArray.filter((value) => value.done);
        setPercentage(Math.round(CompletedHabits.length/ cardsArray.length * 100));
    }, [cardsArray, setPercentage]);

    return (
        <TodayStyle>
            <Date>{date}</Date>
            <TodayStats percentage={percentage}>{percentage ? `${percentage}% dos hábitos concluídos`: 'Nenhum hábito concluído ainda' }</TodayStats>
            <CardsPlaceToday>
                {cardsArray.map((value, index) =>
                    <CardToday
                        key={index}
                        id={value.id}
                        name={value.name}
                        highestSequence={value.highestSequence}
                        currentSequence={value.currentSequence}
                        done={value.done}
                        update={update}
                        setUpdate={setUpdate}
                        record={value.highestSequence === value.currentSequence && value.highestSequence } />)}
            </CardsPlaceToday>
        </TodayStyle>
    );
}

function CardToday({ id, name, currentSequence, highestSequence, done, update, setUpdate, record }) {
    const { token } = useContext(UserContext);

    function desmarcar() {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
        const AUT = { headers: { Authorization: `Bearer ${token}` } };
        const promise = axios.post(URL, null, AUT);
        promise.then((response) => {
            if(response)setUpdate(!update);
        }).catch((err) => {
            console.log(err);
        });
    }

    function marcar() {
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
        const AUT = { headers: { Authorization: `Bearer ${token}` } };
        const promise = axios.post(URL, null, AUT);
        promise.then((response) => {
            if(response)setUpdate(!update);
        }).catch((err) => {
            console.log(err);
        });
    }

    function MarkToggle() {
        if (done) {
            desmarcar();
        } else {
            marcar();
        }
    }

    return (
        <CardTodayStyles done={done}>
            <div>
                <h2>{name}</h2>
                <h3>Sequência atual: <CurrentStyles done={done}>{currentSequence} dia(s)</CurrentStyles></h3>
                <h3>Seu recorde: <HighestStyles record={record}>{highestSequence} dia(s)</HighestStyles></h3>
            </div>
            <MarkStyle onClick={MarkToggle} done={done}>
                <ion-icon name="checkmark-outline"></ion-icon>
            </MarkStyle>
        </CardTodayStyles>
    );
}

const TodayStyle = styled.main`
    width: 375px;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background: #f2f2f2;
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

const TodayStats = styled.span`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: ${(props) => props.percentage ? '#8FC549' : '#BABABA' };
`;

const CardsPlaceToday = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 28px;
`;


const CardTodayStyles = styled.div`
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

const CurrentStyles = styled.span`
    color: ${(props) => props.done ? '#8FC549' : '#666666'};
`;

const HighestStyles = styled.span`
    color: ${(props) => props.record ? '#8FC549' : '#666666'};
`;

const MarkStyle = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 69px;
    height: 69px;
    background: ${(props) => props.done ? '#8FC549' : '#EBEBEB'};
    border: 1px solid #E7E7E7;
    border-radius: 5px;

    ion-icon {
        --ionicon-stroke-width: 66px;
        color: #FFFFFF;
        font-size: 54px;
    }
`;