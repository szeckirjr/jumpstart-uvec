import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword, logInWithEmailAndPassword } from "../api/firebase";

export function LoginPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    const user = localStorage.getItem('USER');
    if(user){
        navigate('/');
    }
  },[]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const loginUser = await logInWithEmailAndPassword(user, password);
      if (loginUser) {
        localStorage.setItem('USER', JSON.stringify(loginUser.user.email));
        navigate('/');
        console.log(loginUser);
      }
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <Stack
      width="100%"
      height="100vh"
      direction="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      py={3}
      spacing={6}
    >
      <Paper>
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
                className="button-block"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Stack>
  );
}
