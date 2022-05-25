import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from '../assets/logo.png';

export function Login (){
    return (
        <ScreenForm>
            <img src={logo} alt='Logo do TrackIt' />
            <form action="|">
                <input
                    type='email'
                    placeholder='email'/>
                <input
                    type='password'
                    placeholder='senha' />
                <button type='submit'>Entrar</button>
                <Link to='/cadastro'>Não tem uma conta? Cadastre-se!</Link>
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