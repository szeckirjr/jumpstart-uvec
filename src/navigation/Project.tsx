import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Steps } from "../components/project/Steps";

export function Project() {
    const { id } = useParams();

    return (
        <>
            <Stack py={5} textAlign="center" width="100%" direction="column">
                <Typography variant="h3" fontWeight="bold">
                    Project {id}
                </Typography>
            </Stack>
            <Steps />
        </>
    );
}
