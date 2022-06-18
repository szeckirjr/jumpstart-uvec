import { AddTask } from "@mui/icons-material";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
    Typography,
    Stack,
    ListItemButton,
    Button,
} from "@mui/material";
import { useState } from "react";
import { getUserDataFromEmail, updateUserProjects } from "../../api/firebase";
import { Project, Step, Task } from "../../types/projects";

export function SideSheet({ element, project }: { element: Step | Task, project: Project }) {
    const drawerWidth = "33%";
    const [_, refresh] = useState(true);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Box sx={{ m: 2 }}>
                <Typography variant="h5" component="div">
                    {"tasks" in element ? "Step" : `Task ${element.id}`} {element.title}
                </Typography>
            </Box>
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary={`ID: ${element.id}`} />
                </ListItem>
                {"tasks" in element ? (
                    ""
                ) : (
                    <ListItem>
                        <ListItemText
                            primary={`Description: ${element.description}`}
                        />
                    </ListItem>
                )}
                <ListItem>
                    <ListItemText
                        primary={`Completed: ${element.isCompleted}`}
                    />
                </ListItem>
                {"tasks" in element ? (
                    ""
                ) : (
                    <ListItem>
                        <ListItemText
                            primary={`Blocked By: ${element.blockedBy}`}
                        />
                    </ListItem>
                )}
                {"tasks" in element ? (
                    <ListItem>
                        <Stack direction="column">
                            <ListItemText primary={"Tasks:"} />
                            <Button onClick={() => addTask(project, element, refresh)}>Add</Button>
                            <List sx={{ mx: 2 }}>
                                {element.tasks.map((task) => (
                                    <ListItemText
                                        primary={`Task ${task.id}: ${task.title}`}
                                    />
                                ))}
                            </List>
                        </Stack>
                    </ListItem>
                ) : (
                    ""
                )}
            </List>
        </Drawer>
    );
}

async function addTask(project:Project, element:Step, refresh:Function) {
    const email=localStorage.getItem("USER");
    const allProjects = await getUserDataFromEmail(email);
    if(!allProjects){
        console.log("failied to get Projects");
        return;
    }
    console.log(element.id)
    const index = allProjects.findIndex((p: Project) => p.title === project.title);
    project.steps[Number(element.id)].tasks.push({id:`${project.steps[Number(element.id)].tasks.length+1}`, title:"New Task", description: "", isCompleted:false, blockedBy:[]})
    allProjects[index] = project;

    console.log(allProjects)
    updateUserProjects(email, allProjects);
    refresh((o:Boolean)=>!o);
}
