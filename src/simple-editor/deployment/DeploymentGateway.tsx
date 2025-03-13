
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
                    The API Gateway is a required component which supports the CLI and Test Suite. The API Gateway must be configured with a secret key. However, that secret key can be empty if no authentication is required. The Test Suite does not currently use keys for authentication. The below example shows how to set the API Gateway secret to be empty with no authentication.
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

