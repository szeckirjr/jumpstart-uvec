import { Stack, TextField, Typography } from "@mui/material";

export function Landing() {
  return (
    <Stack py={3} textAlign="center" width="100%" direction="column">
      <Typography variant="h2" fontWeight="bold">
        Jumpstart
      </Typography>
      <TextField
        style={{
          width: "60%",
        }}
        id="outlined-basic"
        label="Enter a prompt to start"
        variant="outlined"
      />
    </Stack>
  );
}
