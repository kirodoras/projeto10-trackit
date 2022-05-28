import FooterMenu from "./sharedComponents/FooterMenu";
import Header from "./sharedComponents/Header";

import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function Historic (){
    const { avatar } = useContext(UserContext);
    return (
        <>
            <Header avatar={avatar}/>
            <FooterMenu />
        </>
    );
}