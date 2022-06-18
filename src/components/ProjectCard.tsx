import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
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
                <Stack direction="row">
                    <Typography variant="h6" color="gray">
                        {getNextTask(project)}
                    </Typography>
                </Stack>
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
    // console.log("UNDONE", uncompletedSteps);
    var task = undefined;
    uncompletedSteps.forEach((step) => {
        console.log(
            "WHAT",
            step.tasks.some((task) => !task.isCompleted)
        );
        if (step.tasks.some((task) => !task.isCompleted)) {
            console.log(
                "YEP!!",
                step.tasks.find((task) => !task.isCompleted)?.title
            );
            task = step.tasks.find((task) => !task.isCompleted)?.title;
            // return step.tasks.find((task) => !task.isCompleted)?.title;
        }
    });
    return task ?? "No tasks left";
    // return uncompletedSteps[0].tasks.filter((task) => !task.isCompleted)[0].title;
}
