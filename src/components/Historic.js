import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";
import styled from 'styled-components';
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Historic (){
    const { avatar } = useContext(UserContext);
    return (
        <>
            <Header avatar={avatar}/>
            <HistoricContent />
            <FooterMenu />
        </>
    );
}

function HistoricContent () {
    return (
        <HistoricStyle>
            <Tittle>Histórico</Tittle>
            <DefaultMessage>Em breve você poderá ver o histórico dos seus hábitos aqui!</DefaultMessage>
        </HistoricStyle>
    );
}
const HistoricStyle = styled.main`
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