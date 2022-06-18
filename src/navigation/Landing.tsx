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
          title: "Ready Area",
          isCompleted: false,
          tasks: [
            {
              title: "Choose area",
              description: "Choose gooad patch of backyard",
              isCompleted: false,
              blockedBy: [],
            },
          ],
        },
        {
          title: "Ready Seeds",
          isCompleted: false,
          tasks: [
            {
              title: "Choose Variety",
              description: "Choose vareity of roses",
              isCompleted: false,
              blockedBy: [],
            },
            {
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
          title: "Reasearch Some Books",
          isCompleted: true,
          tasks: [
            {
              title: "Choose Books to Read",
              description: "Choose some good books for inspiration",
              isCompleted: true,
              blockedBy: [],
            },
          ],
        },
        {
          title: "Formulate the World",
          isCompleted:false,
          tasks: [
            {
              title: "Think of an idea",
              description: "Think of a focus point of the story",
              isCompleted: true,
              blockedBy: [],
            },
            {
              title: "Start on the world",
              description: "Think of the world arounf that focus point",
              isCompleted: false,
              blockedBy: [],
            },
          ],
        },
      ],
    },
  ];
}
