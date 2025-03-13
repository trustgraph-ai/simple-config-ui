
import React from 'react';

import { Typography, Paper, Stack, Alert } from '@mui/material';
import { Insights } from '@mui/icons-material';

import { useOptionsStore, CONFIGURE_WORKBENCH } from '../state/Options';

import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

const DeploymentWorkbench: React.FC<{}> = ({
}) => {

    const options = useOptionsStore((state) => state.options);

    return (

        <>

            {
                (!options.has(CONFIGURE_WORKBENCH)) && 
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Alert severity="info">
                        You have selected to deploy <strong>without</strong> the
                        Test Suite. The Test Suite provides a UI
                        for testing TrustGraph performance. You can add the
                        Test Suite to the deployment on the <strong>CUSTOMIZATION</strong> tab.
                    </Alert>
                </Paper>
            }

            {

                (options.has(CONFIGURE_WORKBENCH)) && 

                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        sx={{mb: 2}}
                    >
                        <Insights color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Test Suite
                        </Typography>
                    </Stack>

                    <DeploymentStep>
                        Once the system is running, you can access the
                        Test Suite on port 8888, or access using the
                        following URL:
                    </DeploymentStep>

                    <DeploymentCode>
                        <a href="http://localhost:8888">
                            http://localhost:8888/
                        </a>
                    </DeploymentCode>

                    <DeploymentStep>
                        Once you have data loaded, you can present a
                        Graph RAG query on the Chat tab.  As well as
                        answering the question, a list of semantic relationships
                        which were used to answer the question are shown
                        and these can be used to navigate the knowledge
                        graph.
                    </DeploymentStep>

                </Paper>
            }

        </>

    );

};

export default DeploymentWorkbench;

