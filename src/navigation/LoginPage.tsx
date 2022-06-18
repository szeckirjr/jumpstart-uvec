import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <Stack
      width="100%"
      height="100vh"
      direction="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      py={3}
      spacing={3}
    >
      <Typography variant="h2" fontWeight="bold">
        Jumpstart
      </Typography>
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button onClick={() => navigate("/dashboard")} variant="contained">
        Login
      </Button>
    </Stack>
  );
}
