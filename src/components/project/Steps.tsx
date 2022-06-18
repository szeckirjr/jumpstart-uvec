import { Button, List, ListItem, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Project, Step, Task } from "../../types/projects";

const useStyles = makeStyles({
    step: {
        cursor: "pointer",
        color: "black",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    task: {
        cursor: "pointer",
        color: "black",
        "&:hover": {
            textDecoration: "underline",
        },
    },
});

// const steps: Step[] = [
//     {
//         id: "1",
//         title: "Step 1",
//         tasks: [
//             {
//                 id: "1",
//                 title: "Task 1",
//                 description: "Description 1",
//                 isCompleted: false,
//                 blockedBy: [],
//             },
//         ],
//         isCompleted: false,
//     },
//     {
//         id: "2",
//         title: "Step 2",
//         tasks: [
//             {
//                 id: "1",
//                 title: "Task 1",
//                 description: "Description 1",
//                 isCompleted: false,
//                 blockedBy: [],
//             },
//         ],
//         isCompleted: false,
//     },
//     {
//         id: "3",
//         title: "Step 3",
//         tasks: [
//             {
//                 id: "1",
//                 title: "Task 1",
//                 description: "Description 1",
//                 isCompleted: false,
//                 blockedBy: [],
//             },
//             {
//                 id: "2",
//                 title: "Task 2",
//                 description: "Description 2",
//                 isCompleted: false,
//                 blockedBy: ["1.1"],
//             },
//         ],
//         isCompleted: false,
//     },
// ];

function StepList({
    steps,
    step,
    idx,
    setSideSheetElement,
}: {
    steps: Step[];
    step: Step;
    idx: number;
    setSideSheetElement: Function;
}) {
    const classes = useStyles();
    return (
        <ListItem>
            <Stack>
                <Typography
                    className={classes.step}
                    variant="h5"
                    fontWeight="bold"
                    onClick={() => setSideSheetElement(steps[idx])}
                >
                    {step.title}
                </Typography>
                {step.tasks.map((task, idx) =>
                    TaskList({
                        tasks: step.tasks,
                        task,
                        idx,
                        setSideSheetElement,
                    })
                )}
            </Stack>
        </ListItem>
    );
}

function TaskList({
    tasks,
    task,
    idx,
    setSideSheetElement,
}: {
    tasks: Task[];
    task: Task;
    idx: number;
    setSideSheetElement: Function;
}) {
    const classes = useStyles();
    return (
        <Typography
            className={classes.step}
            variant="h6"
            marginLeft={3}
            onClick={() => setSideSheetElement(tasks[idx])}
        >
            {idx + 1}. {task.title}
        </Typography>
    );
}

function Steps({
    project,
    setSideSheetElement,
}: {
    project: Project;
    setSideSheetElement: Function;
}) {
    const { steps } = project;
    console.log(steps);
    return (
        project && (
            <Stack px={5} textAlign="left" direction="column">
                <Stack direction="row" width="100%">
                    <Typography variant="h4" fontWeight="bold">
                        Steps
                    </Typography>
                    <Button
                        variant="contained"
                        style={{
                            marginLeft: "30px",
                            fontSize: "15px",
                        }}
                        onClick={() => {
                            steps.push({
                                id: `${steps.length + 1}`,
                                title: "New step",
                                tasks: [],
                                isCompleted: false,
                            });
                            project.steps = steps;
                        }}
                    >
                        New Step
                    </Button>
                </Stack>
                <List>
                    {steps.map((step, idx) =>
                        StepList({ steps, step, idx, setSideSheetElement })
                    )}
                </List>
            </Stack>
        )
    );
}

export default Steps;
