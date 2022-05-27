import React from 'react';
import styled from 'styled-components';
import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Habits() {
    const { avatar, token } = useContext(UserContext);

    return (
        <>
            <Header avatar={avatar} />
            <HabitsContent></HabitsContent>
            <FooterMenu />
        </>
    );
}

function HabitsContent() {
    return (
        <HabitsStyle>
            <HabitsHeader>
                <h1>Meus hábitos</h1>
                <button type='button'>+</button>
            </HabitsHeader>
            <CreateHabit />
            <HabitsStats>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</HabitsStats>
            <CardsPlaceHabits>
            </CardsPlaceHabits>
        </HabitsStyle>
    );
}

function CreateHabit() {
    return (
        <CreateHabitStyles>
            <form>
                <input
                    type="text"
                    placeholder='nome do hábito' />
                <Days>
                    <Day>D</Day>
                    <Day>S</Day>
                    <Day>T</Day>
                    <Day>Q</Day>
                    <Day>Q</Day>
                    <Day>S</Day>
                    <Day>S</Day>
                </Days>
                <ButtonsPlace>
                    <CancelButton type='button'>Cancelar</CancelButton>
                    <SaveButton type='submit'>Salvar</SaveButton>
                </ButtonsPlace>
            </form>
        </CreateHabitStyles>
    );
}

const HabitsStyle = styled.main`
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

const HabitsHeader = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;

    h1 {
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: var(--color-dark-blue);
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 40px;
        max-width: 100%;
        height: 35px;

        font-weight: 600;
        font-size: 32px;
        color: #FFFFFF;
        background: #52B6FF;
        border-radius: 4.63636px;
    }
`;

const CardsPlaceHabits = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const HabitsStats = styled.span`
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
`;

const CreateHabitStyles = styled.div`
    width: 340px;
    max-width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 18px 18px 10px 18px;

    input {
        width: 303px;
        max-width: 100%;
        height: 45px;

        padding-left: 11px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;

        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }

    input:disabled {
        color: #AFAFAF;
        background: #F2F2F2
    }
`;

const Days = styled.div`
    display: flex;
    gap: 4px;
    margin-top: 8px;
`;

const Day = styled.button`
    width: 30px;
    max-width: 100%;
    height: 30px;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
`;

const ButtonsPlace = styled.span`
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    height: 64px;
    justify-content: flex-end;
    align-items: flex-end;
    button {
        width: 84px;
        max-width: 100%;
        height: 35px;
        border-radius: 4.63636px;
        font-weight: 500;
        font-size: 17px;
        line-height: 20px;
        text-align: center;
    }
`;

const CancelButton = styled.button`
    color: #52B6FF;
    background: #FFFFFF;
`;

const SaveButton = styled.button`
    color: #FFFFFF;
    background: #52B6FF;
`;