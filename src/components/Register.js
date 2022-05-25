import { Link } from "react-router-dom";
import ScreenForm from "./Login";
import logo from '../assets/logo.png';

export default function Register (){
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
                <input
                    type='name'
                    placeholder='nome' />
                <input
                    type='url'
                    placeholder='foto' />
                <button type='submit'>Cadastrar</button>
                <Link to='/'>Já tem uma conta? Faça login!</Link>
            </form>
        </ScreenForm>
    );
}