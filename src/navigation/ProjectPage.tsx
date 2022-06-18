import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NextTask } from "../components/project/NextTask";
import { SideSheet } from "../components/project/SideSheet";
import Steps from "../components/project/Steps";
import { Project } from "../types/projects";

export function ProjectPage() {
    const navigate = useNavigate();
    const location = useLocation();
    //@ts-ignore
    const { project } = location.state as Project;
    const [sideSheetElement, setSideSheetElement] = useState(project!.steps[0]);

    // useEffect(() => {
    //     console.log(!project);
    //     if (!project) {
    //         navigate("/");
    //     }
    // }, [navigate, project]);

    return (
        <>
            <Box style={{ display: "flex" }}>
                <Stack
                    py={5}
                    textAlign="center"
                    width="100%"
                    direction="column"
                    spacing={4}
                >
                    <Typography variant="h3" fontWeight="bold">
                        {project.title}
                    </Typography>
                    <NextTask project={project!} />
                    <Steps
                        project={project}
                        setSideSheetElement={setSideSheetElement}
                    />
                </Stack>
                <SideSheet element={sideSheetElement} />
                <Button
                    onClick={() => navigate("/")}
                    color="success"
                    style={{ position: "absolute", top: 5, left: 5 }}
                    size="large"
                >
                    Back
                </Button>
            </Box>
        </>
    );
}
