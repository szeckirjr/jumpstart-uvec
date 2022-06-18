import { Card, CardContent, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { Project } from "../types/projects";

const useStyles = makeStyles({
    card: {
        borderColor: "black",
        border: "solid 1px black",
        padding: "15px",
        borderRadius: "10px",
        minWidth: "200px",
        maxWidth: "400px",
        flexGrow: "1",
    },
});

export function ProjectCard({ project }: { project: Project }) {
    console.log("PROJECT CARD", project.title);
    const styles = useStyles();
    return (
        <Link
            style={{ textDecoration: "none" }}
            to={"/project"}
            state={{ project }}
        >
            <Container className={styles.card}>
                <Typography variant="h5" fontWeight="bold" color="black">
                    {project.title}
                </Typography>
                <Typography variant="h6" color="gray">
                    {getNextTask(project)}
                </Typography>
            </Container>
            {/* <Card
                variant="outlined"
                style={{
                    flexGrow: 1,
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {project.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.description}
                    </Typography>
                    <Typography variant="h6">Next Task:</Typography>
                    <Typography variant="body2">
                        {getNextTask(project)}
                    </Typography>
                </CardContent>
            </Card> */}
        </Link>
    );
}

function getNextTask(project: Project) {
    const uncompletedSteps = project.steps.filter((step) => !step.isCompleted);
    uncompletedSteps.forEach((step) => {
        if (step.tasks.some((task) => !task.isCompleted)) {
            return step.tasks.find((task) => !task.isCompleted);
        }
    });
    return "No tasks left";
    // return uncompletedSteps[0].tasks.filter((task) => !task.isCompleted)[0].title;
}
