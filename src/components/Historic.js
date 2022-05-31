import React from 'react';
import axios from "axios";
import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";
import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

export default function Historic() {
    const { avatar, token } = useContext(UserContext);
    const [historic, setHistoric] = React.useState([]);

    React.useEffect(() => {
        if (token.length > 0) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily`;
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const promise = axios.get(URL, AUT);
            promise.then((response) => {
                setHistoric(response.data);
                console.log(response.data);
            }).catch((err) => {
                console.log('errou');
                console.log(err);
            });
        }
    }, [token]);

    return (
        <>
            <Header avatar={avatar} />
            <HistoricContent token={token} historic={historic}/>
            <FooterMenu />
        </>
    );
}

function HistoricContent({ token, historic }) {

    function putDate (date) {
        const newDate = dayjs(date).format("DD/MM/YYYY");
        const day = newDate.split('/')[0];
        for (let i = 0; i < historic.length; i++) {
            if (newDate === historic[i].day) {
                let done = historic[i].habits.filter((value) => value.done);
                if (done.length === historic[i].habits.length) {
                    return (<span className="green">{day}</span>);
                } else {
                    return (<span className="red">{day}</span>);
                }
            }
        }
        return day;
    }

    return (
        <HistoricStyle>
            <Tittle>Histórico</Tittle>
            {token ? <Calendar formatDay={(_, date) => putDate(date)} className='calendar' locale='pt-BR'/> : <DefaultMessage>Em breve você poderá ver o histórico dos seus hábitos aqui!</DefaultMessage>}
        </HistoricStyle>
    );
}
const HistoricStyle = styled.main`
    display: flex;
    flex-direction: column;
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

    .calendar {
        margin-top: 18px;
        border: none;
        border-radius: 10px;
        width: 100%;
    }
    .green {
        border-radius: 100%;
        background-color: #8CC654;
        padding: 9px;
    }

    .red {
        border-radius: 100%;
        background-color: #E25666;
        padding: 9px;
    }
`;

const Tittle = styled.h1`
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: var(--color-dark-blue);
`;

const DefaultMessage = styled.span`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #666666;
`;