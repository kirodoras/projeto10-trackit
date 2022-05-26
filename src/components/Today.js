import styled from 'styled-components';
import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

export default function Today() {
    const {avatar, token} = useContext(UserContext);

    return (
        <>
            <Header avatar={avatar}/>
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
        </TodayStyle>
    );
}

const TodayStyle = styled.main`
    width: 375px;
    max-width: 100%;
    height: 100%;
    background: #E5E5E5;
    margin-top: 70px;
    padding: 28px 18px 70px 28px;
`;

const Date = styled.h1`
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: var(--color-dark-blue);
`;