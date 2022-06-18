import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    Typography,
    Stack,
    Chip,
} from "@mui/material";
import { Step, Task } from "../../types/projects";

export function SideSheet({ element }: { element: Step | Task }) {
    const drawerWidth = "33%";
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
                    {"tasks" in element ? "Step" : `Task ${element.id}`}{" "}
                    {element.title}
                </Typography>
            </Box>
            <Divider />
            <List>
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
                    {element.isCompleted ? (
                        <Chip label="Completed" color="success" />
                    ) : (
                        <Chip label="Not Completed" color="error" />
                    )}
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
