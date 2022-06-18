import { Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export function Logo({ size }: { size: "sm" | "md" | "lg" }) {
    const variant = size === "sm" ? "h4" : size === "md" ? "h3" : "h2";
    const variant2 = size === "sm" ? "h6" : size === "md" ? "h6" : "h5";
    const iconSize =
        size === "sm" ? "small" : size === "md" ? "medium" : "large";
    return (
        <Stack width="100%" textAlign="center" alignItems="center">
            <Stack direction="row">
                <Typography variant={variant} fontWeight="bold">
                    Jumpstart
                </Typography>
                <AutoAwesomeIcon fontSize={iconSize} />
            </Stack>
            <Typography variant={variant2} color="gray">
                Idea → Steps → Tasks → Action!
            </Typography>
        </Stack>
    );
}
