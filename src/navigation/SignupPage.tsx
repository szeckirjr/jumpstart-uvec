import {
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createProjectMultiSteps, logInWithEmailAndPassword, registerWithEmailAndPassword, auth } from "../api/firebase";
import { Logo } from "../components/Logo";
import { Project } from "../types/projects";

export function SignupPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
      const app_user = localStorage.getItem("USER");
      if (app_user) {
          navigate("/");
      }
    }, []);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const createUser = await registerWithEmailAndPassword(username, email, password);
        console.log(createUser);
        if (createUser) {
            console.log(createUser);
            localStorage.setItem("USER", email);
            navigate("/");
        } else {
            setError("Unable to create account");
            event.target.reset();
        }
    };

    return (
        <Stack
            width="100%"
            height="100vh"
            direction="column"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
        >
            <Paper elevation={5} style={{ padding: "50px" }}>
                <Stack spacing={3}>
                    <Logo size="sm" />
                    <Typography fontWeight={600} fontSize={18}>Create an Account</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    type="username"
                                    placeholder="Username"
                                    fullWidth
                                    name="username"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setUsername(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    fullWidth
                                    name="email"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    fullWidth
                                    name="password"
                                    variant="outlined"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    className="button-block"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    {error && <Typography color="red">{error}</Typography>}
                    <Box>
                        <Typography>Already have an account ? <Link to={"/login"}>Log in</Link></Typography>
                    </Box>
                </Stack>
            </Paper>
        </Stack>
    );
}
