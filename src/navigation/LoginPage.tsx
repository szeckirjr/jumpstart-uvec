import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

export function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("USER");
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const loginUser = await logInWithEmailAndPassword(user, password);
    if (loginUser) {
      const email = JSON.stringify(loginUser.user.email).replaceAll("\"", "");
      localStorage.setItem("USER", JSON.stringify(email));
      navigate("/");
      console.log(loginUser);
    } else {
      setError("Invalid credentials");
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
        <Stack spacing={5}>
          <Logo size="md" />
          {/* <Box sx={{ p: 3 }}>
          <Typography>Login</Typography>
        </Box> */}
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
                    setUser(event.target.value)
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
        </Stack>
      </Paper>
    </Stack>
  );
}
