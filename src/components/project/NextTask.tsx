import {
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Project } from "../../types/projects";

export function NextTask({ project }: { project: Project }) {
    return (
        <Card variant="outlined" sx={{ mx: 4 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Next Steps:
                </Typography>
                <List sx={{ mx: 2 }}>
                    {getNextTasks(project).map((task, idx) => (
                        <ListItem key={idx}>
                            <ListItemText>
                                {task.id} {task.title}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

function getNextTasks(project: Project) {
    return project.steps
        .filter((step) => !step.isCompleted)
        .map((step) =>
            step.tasks
                .filter((task) => !task.isCompleted)
                .map((task) => ({
                    id: `${step.id}.${task.id}`,
                    title: task.title,
                }))
        )
        .flat();
}
