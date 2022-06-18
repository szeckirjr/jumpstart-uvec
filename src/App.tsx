import { Typography } from "@mui/material";
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
                <Route path="/project/:id" element={<Project />} />
                <Route path="/" element={<Dashboard />} />
                <Route
                    path="*"
                    element={
                        <Typography mt={8} textAlign="center" variant="h2">
                            Page Not Found
                        </Typography>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
