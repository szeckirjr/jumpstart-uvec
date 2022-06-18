import { Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { NextTask } from "../components/project/NextTask";
import { Steps } from "../components/project/Steps";


const project = {
    title: "Gardenning",
    description: "Garden some Roses",
    steps: [
      {
        id: "1",
        title: "Ready Area",
        isCompleted: false,
        tasks: [
          {
            id: "1",
            title: "Choose area",
            description: "Choose gooad patch of backyard",
            isCompleted: false,
            blockedBy: [],
          },
        ],
      },
      {
        id: "2",
        title: "Ready Seeds",
        isCompleted: false,
        tasks: [
          {
            id: "1",
            title: "Choose Variety",
            description: "Choose vareity of roses",
            isCompleted: false,
            blockedBy: [],
          },
          {
            id: "2",
            title: "Buy Seeds",
            description: "Buy the chosen variety",
            isCompleted: false,
            blockedBy: [],
          },
        ],
      },
    ],
  }

export function Project() {
    const { id } = useParams();

    return (
        <>
            <Stack py={5} textAlign="center" width="100%" direction="column">
                <Typography variant="h3" fontWeight="bold">
                    Project {id}
                </Typography>
            </Stack>
            <NextTask project={project}/>
            <Steps />
        </>
    );
}
