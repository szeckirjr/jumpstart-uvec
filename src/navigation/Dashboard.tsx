import {
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleOpenAIAPI } from "../api/openai";
import { Logo } from "../components/Logo";
import { getUserDataFromEmail, updateUserProjects } from "../api/firebase";
import { Project, Step } from "../types/projects";
import { ProjectCard } from "../components/ProjectCard";

export function Dashboard() {
    const isMobile = useMediaQuery("(max-width:800px)");
    const navigate = useNavigate();
    const [prompt, setPrompt] = useState<string>("");
    const [prevPrompt, setPrevPrompt] = useState<string>("");
    const [loading, setLoading] = useState<boolean | null>();
    const [response, setResponse] = useState<string | undefined>(undefined);
    const [userData, setUserData] = useState<Project[]>();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("USER");
        if (!user) {
            navigate("/login");
        } else {
            setUserEmail(user);
            setLoading(true);
            getUserDataFromEmail(user).then((data) => {
                setLoading(false);
                console.log("USER DATA", data);
                setUserData(data);
            });
        }
    }, [navigate]);

    useEffect(() => {
        if (response) {
            const validSteps = response
                .split(/\n|\r/g)
                .filter((step) => step && step.trim() !== "");
            const steps: Step[] = validSteps.map((step, idx) => {
                return {
                    id: idx.toString(),
                    title: step,
                    isCompleted: false,
                    tasks: [],
                };
            });
            userData?.push({
                title: prevPrompt,
                description: "",
                steps,
            });
            updateUserProjects(userEmail, userData);
        }
    }, [prevPrompt, response, userData, userEmail]);

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
                            setResponse,
                            setPrevPrompt
                        );
                    }
                }}
            />
            <Button
                onClick={() =>
                    handleOpenAIAPI(
                        prompt,
                        setPrompt,
                        setLoading,
                        setResponse,
                        setPrevPrompt
                    )
                }
                variant="outlined"
            >
                Start Project
            </Button>
            <Container
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                }}
            >
                {loading === true ? (
                    <CircularProgress />
                ) : (
                    userData &&
                    userData.length > 0 &&
                    userData.map((project, idx) => (
                        <ProjectCard key={idx} project={project} />
                    ))
                )}
            </Container>
            {/* {loading === true ? (
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
            )} */}
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
