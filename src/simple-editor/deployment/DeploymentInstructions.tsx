
import React from 'react';

import {
    Typography, Box, Paper, Stack,
} from '@mui/material';

import { RocketLaunch } from '@mui/icons-material';

import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

interface DeploymentInstructionsProps {
}

const DeploymentInstructions: React.FC<DeploymentInstructionsProps> = ({
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
                        <RocketLaunch color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Launch
                        </Typography>
                    </Stack>

                    <DeploymentStep>

                        When you download the deploy configuration, you will
                        have a ZIP file containing all the configuration
                        needed to launch TrustGraph in Docker Compose or
                        Podman Compose.
                        Unzip the ZIP file...

                    </DeploymentStep>

                    <DeploymentCode>
                        unzip deploy.zip
                    </DeploymentCode>

                    <DeploymentStep>

                        and launch...

                    </DeploymentStep>

                    <DeploymentCode>
                        docker compose -f docker-compose.yaml up -d
                    </DeploymentCode>

                    <DeploymentStep>

                        If you are on Linux, running SELinux, you may need
                        to change permissions on files in the deploy bundle
                        so that they are accessible from within containers.
                        This affects
                        the <code>grafana</code> and <code>prometheus</code> directories.
                    </DeploymentStep>
                        
                    <DeploymentCode>
                        chcon -Rt svirt_sandbox_file_t grafana prometheus<br/>
                        chmod 755 prometheus/ grafana/ grafana/*/<br/>
                        chmod 644 prometheus/* grafana/*/*
                    </DeploymentCode>

                </Paper>
            </Box>

        </>

    );

};

export default DeploymentInstructions;

