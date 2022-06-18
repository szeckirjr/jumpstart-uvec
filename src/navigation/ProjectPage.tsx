import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NextTask } from "../components/project/NextTask";
import { SideSheet } from "../components/project/SideSheet";
import Steps from "../components/project/Steps";
import { Project } from "../types/projects";

export function ProjectPage() {
    //const navigate = useNavigate();
    const location = useLocation();
    //@ts-ignore
    const { project } = location.state as Project;

    // useEffect(() => {
    //     console.log(!project);
    //     if (!project) {
    //         navigate("/");
    //     }
    // }, [navigate, project]);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <Stack
                    py={5}
                    textAlign="center"
                    width="100%"
                    direction="column"
                >
                    <Typography variant="h3" fontWeight="bold">
                        Project
                    </Typography>
                    <NextTask project={project!} />
                    <Steps steps={project.steps} />
                </Stack>
                <SideSheet element={project!.steps[0]} />
            </Box>
        </>
    );
}
