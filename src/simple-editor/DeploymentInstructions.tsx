
import React from 'react';

import { RocketLaunch } from '@mui/icons-material';

import {
    Typography, Card, CardContent, CardHeader
} from '@mui/material';

interface DeploymentInstructionsProps {
}

const DeploymentInstructions: React.FC<DeploymentInstructionsProps> = ({
}) => {

    return (

        <>

            <Card sx={{ minWidth: 275, mt: 4 }}>
                <CardHeader
                    avatar={<RocketLaunch color="primary" fontSize="large"/>}
                    title="Launch"
                />
                <CardContent>
                    <Typography variant="body2">
                        When you download the deploy configuration, you will
                        have a ZIP file containing all the configuration
                        needed to launch TrustGraph in Docker Compose or
                        Podman Compose.
                        Unzip the ZIP file...
                        <pre>unzip deploy.zip
                        </pre>
                        and launch...
                        <pre>docker compose -f docker-compose.yaml up -d
                        </pre>
                    </Typography>
                </CardContent>
            </Card>

        </>

    );

};

export default DeploymentInstructions;

