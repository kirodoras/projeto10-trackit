import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Loading from './sharedComponents/Loading';

export default function Habits() {
    const { avatar, token } = useContext(UserContext);

    return (
        <>
            <Header avatar={avatar} />
            <HabitsContent token={token}></HabitsContent>
            <FooterMenu />
        </>
    );
}

function HabitsContent({ token }) {
    const [create, setCreate] = React.useState(false);
    const [name, setName] = React.useState('');
    const [arrayIdsDays, setArrayIdsDays] = React.useState([]);
    const [cardsArray, setCardsArray] = React.useState([]);
    const [update, setUpdate] = React.useState([]);
    const [daysArray, setDaysArray] = React.useState([
        { day: 'D', mark: false },
        { day: 'S', mark: false },
        { day: 'T', mark: false },
        { day: 'Q', mark: false },
        { day: 'Q', mark: false },
        { day: 'S', mark: false },
        { day: 'S', mark: false },
    ]);

    React.useEffect(() => {
        if (token.length > 0) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
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
        <HabitsStyle>
            <HabitsHeader>
                <h1>Meus hábitos</h1>
                <button onClick={() => setCreate(!create)} type='button'>+</button>
            </HabitsHeader>
            {create &&
                <CreateHabit
                    token={token}
                    setCreate={setCreate}
                    daysArray={daysArray}
                    setDaysArray={setDaysArray}
                    name={name}
                    setName={setName}
                    arrayIdsDays={arrayIdsDays}
                    setArrayIdsDays={setArrayIdsDays}
                    setUpdate={setUpdate}
                    update={update} />}
            <CardsPlaceHabits>
                {cardsArray.length ?
                    cardsArray.map((value, index) =>
                        <CardsHabits
                            key={index}
                            id={value.id}
                            name={value.name}
                            days={value.days}
                            setUpdate={setUpdate}
                            update={update} />)
                    : <HabitsStats>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </HabitsStats>}
            </CardsPlaceHabits>
        </HabitsStyle>
    );
}

function CardsHabits({ name, days, id, setUpdate, update }) {
    const { token } = useContext(UserContext);
    const arrayDefault = [
        { day: 'D', mark: false },
        { day: 'S', mark: false },
        { day: 'T', mark: false },
        { day: 'Q', mark: false },
        { day: 'Q', mark: false },
        { day: 'S', mark: false },
        { day: 'S', mark: false },
    ];
    arrayDefault.map((value, index) => {
        if (days.includes(index)) {
            return value.mark = true;
        } else {
            return value.mark;
        }
    });

    function deleteCard() {
        const confirmation = window.confirm('Deseja realmente excluir?');
        if (confirmation) {
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
            const promise = axios.delete(URL, AUT);
            promise.then((response) => {
                if(response)setUpdate(!update);
            }).catch((err) => {
                alert('Erro em excluir habito');
                console.log(err.data);
            });
        }
    }

    return (
        <CardsHabitsStyles>
            <div>
                <h2>{name}</h2>
                <Days>
                    {arrayDefault.map((value, index) => <DayStyles
                        mark={value.mark}
                        key={index}>
                        {value.day}
                    </DayStyles>)}
                </Days>
            </div>
            <ion-icon name="trash-outline" onClick={deleteCard}></ion-icon>
        </CardsHabitsStyles>
    );
}

function CreateHabit({ token, setCreate, daysArray, setDaysArray, name, setName, arrayIdsDays, setArrayIdsDays, setUpdate, update }) {
    const [disabled, setDisabled] = React.useState(false);
    const [buttonContent, setButtonContent] = React.useState('Salvar');

    function addDay(id) {
        daysArray[id].mark = true;
        setDaysArray([...daysArray]);
        setArrayIdsDays([...arrayIdsDays, id]);
    }

    function removeDay(id) {
        daysArray[id].mark = false;
        setDaysArray([...daysArray]);
        setArrayIdsDays(arrayIdsDays.filter((value) => value !== id));
    }

    function submitData(event) {
        event.preventDefault();
        if (arrayIdsDays.length > 0) {
            setDisabled(true);
            setButtonContent(<Loading size={50} />);
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`;
            const AUT = { headers: { Authorization: `Bearer ${token}` } };
            const promise = axios.post(URL,
                {
                    name: name,
                    days: arrayIdsDays
                }, AUT);
            promise.then((response) => {
                setName('');
                daysArray.map((value) => {
                    if (value.mark) value.mark = false;
                    return value;
                });
                setArrayIdsDays([]);
                setDaysArray([...daysArray]);
                setCreate(false);
                setUpdate(!update);
            }).catch((err) => {
                setDisabled(false);
                setButtonContent('Salvar');
                alert('Erro em salvar');
            });
        } else {
            alert('Selecione pelo menos uma dia..');
        }
    }

    return (
        <CreateHabitStyles>
            <form onSubmit={submitData}>
                <input
                    type="text"
                    placeholder='nome do hábito'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={disabled}
                    required />
                <Days>
                    {daysArray.map((value, index) =>
                        <Day
                            value={value.day}
                            mark={value.mark}
                            id={index}
                            key={index}
                            addDay={() => addDay(index)}
                            removeDay={() => removeDay(index)} />)}
                </Days>
                <ButtonsPlace>
                    <CancelButton type='button' onClick={() => setCreate(false)} disabled={disabled}>Cancelar</CancelButton>
                    <SaveButton type='submit' disabled={disabled}>
                        {buttonContent}
                    </SaveButton>
                </ButtonsPlace>
            </form>
        </CreateHabitStyles>
    );
}

function Day({ value, addDay, removeDay, mark }) {

    function MarkToggle() {
        if (mark) {
            removeDay();
        } else {
            addDay();
        }
    }

    return (
        <DayStyles onClick={MarkToggle} mark={mark}>
            {value}
        </DayStyles>
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

const DayStyles = styled.div`
    width: 30px;
    max-width: 100%;
    height: 30px;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    text-align: center;
    color: ${(props) => props.mark ? '#FFFFFF' : '#DBDBDB'};
    background: ${(props) => props.mark ? '#CFCFCF' : '#FFFFFF'};
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #52B6FF;
`;

const CardsHabitsStyles = styled.div`
    display: flex;
    justify-content: space-between;
    width: 340px;
    max-width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 11px 10px 15px 14px;


    div {
        h2 {
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            color: #666666;
        }
    }
    ion-icon {
        font-size: 23px;
    }
`;