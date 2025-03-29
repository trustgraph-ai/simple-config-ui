
import React from 'react';
import  { logout as authLogout } from '../auth';

import { Typography, Box, Stack, Button } from '@mui/material';

const Banner: React.FC = () => {

    const logout = () => {
        authLogout().then(() => console.log("Logged out"));
    }

    return (

        <Stack
            alignItems="center"
            direction="row"
            gap={2}
            sx={{ mb: 3 }}
        >
                <Box>
                    <img src="/tg.svg" alt="Trustgraph logo"
                        height="45"/>
                </Box>
                <Typography variant="h4" component="h1">
                    Configuration Builder
                </Typography>
                <Box sx={{flexGrow: 10}}>
                </Box>
                <Box>
                    <Button onClick={() => logout()}>Logout</Button>
                </Box>
        </Stack>
    );

}

export default Banner;

