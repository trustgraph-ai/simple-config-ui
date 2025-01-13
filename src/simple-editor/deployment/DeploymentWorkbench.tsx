
import React from 'react';

import {
    Typography, Box, Paper, Stack,
} from '@mui/material';
import { Insights } from '@mui/icons-material';

import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

const DeploymentWorkbench: React.FC<{}> = ({
}) => {

    return (

        <>

            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        sx={{mb: 2}}
                    >
                        <Insights color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Data Workbench
                        </Typography>
                    </Stack>

                    <DeploymentStep>

                        Once the system is running, you can access the
                        Data Workbench on port 8888, or access using the
                        following URL:

                    </DeploymentStep>

                    <DeploymentCode>
                        <a href="http://localhost:8888">http://localhost:8888/</a>
                    </DeploymentCode>

                    <DeploymentStep>
                        Once you have data loaded, you can present a
                        Graph RAG query on the Chat tab.  As well as
                        answering the question, a list of knowledge graph
                        which were used to answer the question are shown
                        and these can be used to navigate the knowledge
                        graph.
                    </DeploymentStep>

                </Paper>
            </Box>

        </>

    );

};

export default DeploymentWorkbench;

