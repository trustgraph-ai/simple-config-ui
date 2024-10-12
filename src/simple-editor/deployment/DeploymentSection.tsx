
import { Stack, Box, Typography, Paper, } from '@mui/material';

const DeploymentSection = ({avatar, title, children}) => {
    return (
        <Box>
            <Paper
                sx={{
                    minWidth: 375, mt: 2, p: 2
                }}
                elevation={3}
            >
                <Typography
                    variant="h6" component="h3"
                    sx={{ mt: 2, mb: 2 }}
                >
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                    >
                        {avatar}
                        <Box>{title}</Box>
                    </Stack>
                </Typography>
                {children}
            </Paper>
        </Box>
    );

}

export default DeploymentSection;

