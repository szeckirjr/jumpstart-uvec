import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./navigation/Dashboard";
import { LoginPage } from "./navigation/LoginPage";
import { ProjectPage } from "./navigation/ProjectPage";
import { SignupPage } from "./navigation/SignupPage";

import { loggedIn, firebaseObserver, getUser } from "../src/api/firebase";
import { useEffect, useState } from "react";

function App() {

    const [authenticated, setAuthenticated] = useState(loggedIn());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebaseObserver.subscribe('authStateChanged', (data: boolean | ((prevState: boolean) => boolean)) => {
            setAuthenticated(data);
        });
        setIsLoading(false);
        return () => { firebaseObserver.unsubscribe('authStateChanged'); }
    }, []);

    return isLoading ? <div /> : (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/project" element={authenticated && <ProjectPage />} />
                <Route path="/" element={authenticated && <Dashboard />} />
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
