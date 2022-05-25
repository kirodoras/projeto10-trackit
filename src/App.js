import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/reset.css";
import "./styles/style.css";

import { Login } from "./components/Login";
import Register from "./components/Register";
import Habits from "./components/Habits";
import Today from "./components/Today";
import Historic from "./components/Historic";
import ErrorPage from "./components/ErrorPage";

export default function App() {
    return (
        <BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/cadastro" element={<Register />}/>
                <Route path="/habitos" element={<Habits />}/>
                <Route path="/hoje" element={<Today />}/>
                <Route path="/historico" element={<Historic />}/>
                <Route path="*" element={<ErrorPage />}/>
			</Routes>
		</BrowserRouter>
    );
}