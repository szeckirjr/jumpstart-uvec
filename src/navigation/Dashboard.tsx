import {
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { handleOpenAIAPI } from "../api/openai";

export function Dashboard() {
    const isMobile = useMediaQuery("(max-width:800px)");
    const [prompt, setPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean | null>();
    const [response, setResponse] = useState<string | undefined>(undefined);

    return (
        <Stack
            py={3}
            justifyContent="center"
            alignItems="center"
            width="100%"
            direction="column"
            spacing={4}
        >
            <Typography variant="h2" fontWeight="bold">
                Jumpstart
            </Typography>
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
        </Stack>
    );
}
