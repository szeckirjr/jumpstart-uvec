import {
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleOpenAIAPI } from "../api/openai";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Logo } from "../components/Logo";

export function Dashboard() {
    const isMobile = useMediaQuery("(max-width:800px)");
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean | null>();
    const [response, setResponse] = useState<string | undefined>(undefined);

    useEffect(() => {
        const user = localStorage.getItem("USER");
        if (!user) {
            navigate("/login");
        }
    }, []);

    return (
        <Stack
            py={3}
            justifyContent="center"
            alignItems="center"
            width="100%"
            direction="column"
            spacing={4}
        >
            <Logo size="lg" />

            <TextField
                value={prompt}
                style={{
                    width: isMobile ? "90%" : "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
                id="outlined-basic"
                label="Give me an idea of what you need help starting"
                variant="outlined"
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (prompt.trim() === "") return;
                        handleOpenAIAPI(
                            prompt,
                            setPrompt,
                            setLoading,
                            setResponse
                        );
                    }
                }}
            />
            <Button
                onClick={() =>
                    handleOpenAIAPI(prompt, setPrompt, setLoading, setResponse)
                }
                variant="outlined"
            >
                Start Project
            </Button>
            {loading === true ? (
                <CircularProgress />
            ) : (
                <Stack>
                    {response &&
                        response
                            .split(/\n|\r/g)
                            .map(
                                (el) =>
                                    el.trim() !== "" && (
                                        <Typography key={el}>{el}</Typography>
                                    )
                            )}
                </Stack>
            )}
            <Button
                style={{
                    position: "absolute",
                    right: 10,
                    top: 0,
                }}
                color="error"
                variant="outlined"
                onClick={() => {
                    window.localStorage.removeItem("USER");
                    navigate("/login");
                }}
            >
                Logout
            </Button>
        </Stack>
    );
}
