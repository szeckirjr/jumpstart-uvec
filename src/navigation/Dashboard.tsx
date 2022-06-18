import { Stack, TextField, Typography, useMediaQuery } from "@mui/material";

export function Dashboard() {
  const isMobile = useMediaQuery("(max-width:800px)");
  return (
    <Stack
      py={3}
      textAlign="center"
      justifyContent="center"
      justifyItems="center"
      width="100%"
      direction="column"
      bgcolor="green"
      spacing={5}
    >
      <Typography variant="h2" fontWeight="bold">
        Jumpstart
      </Typography>
      <TextField
        style={{
          width: isMobile ? "90%" : "60%",
          margin: "auto",
        }}
        id="outlined-basic"
        label="Enter a prompt to start"
        variant="outlined"
      />
    </Stack>
  );
}
