import { Stack, TextField, Typography } from "@mui/material";
import { ProjectCard } from "../components/ProjectCard";
import { Project } from "../types/projects";

export function Landing() {
  const projects = getProjects();
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
      <Stack direction="row">
        {projects.map((project) => (
          <ProjectCard project={project}></ProjectCard>
        ))}
      </Stack>
    </Stack>
  );
}

function getProjects(): Project[] {
  return [
    {
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
    },
    {
      title: "Writing Book",
      description: "Writing a Fantasy Novel",
      steps: [
        {
          id: "1",
          title: "Reasearch Some Books",
          isCompleted: true,
          tasks: [
            {
              id: "1",
              title: "Choose Books to Read",
              description: "Choose some good books for inspiration",
              isCompleted: true,
              blockedBy: [],
            },
          ],
        },
        {
          id: "2",
          title: "Formulate the World",
          isCompleted:false,
          tasks: [
            {
              id: "1",
              title: "Think of an idea",
              description: "Think of a focus point of the story",
              isCompleted: true,
              blockedBy: [],
            },
            {
              id: "2",
              title: "Start on the world",
              description: "Think of the world arounf that focus point",
              isCompleted: false,
              blockedBy: ["1.1"],
            },
          ],
        },
      ],
    },
  ];
}
