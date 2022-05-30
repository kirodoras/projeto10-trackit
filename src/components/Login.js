import React from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import Loading from './sharedComponents/Loading';
import logo from '../assets/logo.png';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [buttonContent, setButtonContent] = React.useState('Entrar');

    const { setAvatar, setToken, avatar, token } = useContext(UserContext);

    React.useEffect(() => {
        if (token !== '' && token !== undefined && token !== null &&
            avatar !== undefined && avatar !== null && avatar !== '') {
            navigate('/hoje');
        }
    }, [token, avatar, navigate]);

    function submitData(event) {
        event.preventDefault();
        setDisabled(true);
        setButtonContent(<Loading size={50} />);
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`;
        const promise = axios.post(URL,
            {
                email: email,
                password: password
            });
        promise.then((response) => {
            navigate('/hoje');
            setAvatar(response.data.image);
            setToken(response.data.token);
            localStorage.setItem('TrackIt-Avatar', response.data.image);
            localStorage.setItem('TrackIt-Token', response.data.token);
        }).catch((err) => {
            setDisabled(false);
            setButtonContent('Entrar');
            alert('Erro no login');
        });
    }

    return (
        <ScreenForm>
            <img src={logo} alt='Logo do TrackIt' />
            <form onSubmit={submitData}>
                <input
                    disabled={disabled}
                    type='email'
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                <input
                    disabled={disabled}
                    type='password'
                    placeholder='senha'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button type='submit' disabled={disabled}>{buttonContent}</button>
                {disabled ?
                    <span className='linkDisabled'>Não tem uma conta? Cadastre-se!</span>
                    : <Link to='/cadastro'>Não tem uma conta? Cadastre-se!</Link>}
            </form>
        </ScreenForm>
    );
}

const ScreenForm = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 375px;
    max-width: 100%;
    height: 100%;

    img {
        width: 180px;
        max-width: 100%;
        margin: 68px 0px 32.62px 0px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

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

   button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 303px;
        max-width: 100%;
        height: 45px;

        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px; 

        color: var(--color-white);
        background: var(--color-blue);
        border-radius: 4.63636px;
   }

   a, a:link, a:visited, .linkDisabled{
       text-decoration: underline;
       color: var(--color-blue);
       margin-top: 25px;;
   }
`;
export default ScreenForm;