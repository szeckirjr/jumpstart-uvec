import { Card, CardContent, Typography } from "@mui/material";
import { Project } from "../types/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {project.description}
        </Typography>
        <Typography variant="h6">Next Task:</Typography>
        <Typography variant="body2">{getNextTask(project)}</Typography>
      </CardContent>
    </Card>
  );
}

function getNextTask(project: Project) {
    return project.steps.filter((step) => !step.isCompleted)[0].tasks.filter((task) => !task.isCompleted)[0].title;
}
