
import React from 'react';

import { Typography, Paper, Stack } from '@mui/material';
import { Insights } from '@mui/icons-material';

import { useConfigurationStateStore } from '../state/Configuration';

import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

const DeploymentGateway : React.FC<{}> = ({
}) => {

    const platform = useConfigurationStateStore((state) => state.platform);

    return (

        <>

            {

                (platform == "gcp-k8s" ||
                 platform == "minikube-k8s") &&

                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        sx={{mb: 2}}
                    >
                        <Insights color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            API gateway
                        </Typography>
                    </Stack>

                    <DeploymentStep>
                        The API Gateway is an essential software component
                        which supports using command-line utilities and the
                        Data Workbench.  It needs to be configured with a
                        secret key.  You should set the key to the empty
                        string to leave authentication off unless you have
                        a specific need.  Note that the Data Workbench does
                        not know how to use keys for authentication at the
                        present time.
                    </DeploymentStep>

                    <DeploymentCode>
                        kubectl -n trustgraph create secret \<br/>
                        {'    '}generic gateway-secret \<br/>
                        {'    '}--from-literal=gateway-secret=
                    </DeploymentCode>

                </Paper>
            }

        </>

    );

};

export default DeploymentGateway;

