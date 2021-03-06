import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./styles/reset.css";
import "./styles/style.css";

import UserContext from "./contexts/UserContext";
import React from "react";

import { Login } from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import ErrorPage from "./components/ErrorPage";

export default function App() {
    const [avatar, setAvatar] = React.useState(getAvatar);
    const [token, setToken] = React.useState(getToken);
    const [percentage, setPercentage] = React.useState(0);

    function getToken() {
        const localToken = localStorage.getItem('TrackIt-Token');
        if (localToken !== '' && localToken !== undefined && localToken !== null) return localToken;
        return '';
    }

    function getAvatar() {
        const localAvatar = localStorage.getItem('TrackIt-Avatar');
        if (localAvatar !== undefined && localAvatar !== null && localAvatar !== '') return localAvatar;
        return '';
    }

    return (
        <UserContext.Provider value={{ avatar, setAvatar, token, setToken, percentage, setPercentage }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/habitos" element={<Habits />} />
                    <Route path="/hoje" element={<Today />} />
                    <Route path="/historico" element={<Historic />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}