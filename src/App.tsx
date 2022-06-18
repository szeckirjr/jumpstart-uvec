import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./navigation/Dashboard";
import { LoginPage } from "./navigation/LoginPage";
import { Project } from "./navigation/Project";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/project/:id" element={<Project />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
