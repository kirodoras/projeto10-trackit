import React from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Loading from './sharedComponents/Loading';
import ScreenForm from "./Login";
import logo from '../assets/logo.png';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [image, setImage] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);
    const [buttonContent, setButtonContent] = React.useState('Cadastrar');

    function submitData(event) {
        event.preventDefault();
        setDisabled(true);
        setButtonContent(<Loading size={50} />);
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`;
        const promise = axios.post(URL,
            {
                email: email,
                name: name,
                image: image,
                password: password
            });
        promise.then((response) => {
            navigate('/');
            console.log(response);
        }).catch((err) => {
            alert('Erro no cadastro');
            setDisabled(false);
            setButtonContent('Cadastrar');
            console.log(err);
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
                <input
                    disabled={disabled}
                    type='name'
                    placeholder='nome'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                <input
                    disabled={disabled}
                    type='url'
                    placeholder='foto'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required />
                <button type='submit' disabled={disabled}>{buttonContent}</button>
                {disabled ?
                    <span className='linkDisabled'>Já tem uma conta? Faça login!</span>
                    : <Link to='/'>Já tem uma conta? Faça login!</Link>}
            </form>
        </ScreenForm>
    );
}