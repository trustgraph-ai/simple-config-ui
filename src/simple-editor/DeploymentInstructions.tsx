
import React from 'react';

import {
    Typography, Card, CardContent
} from '@mui/material';

interface DeploymentInstructionsProps {
}

const DeploymentInstructions: React.FC<DeploymentInstructionsProps> = ({
}) => {

    return (

        <>

            <Card sx={{ minWidth: 275, mt: 4 }}>
                <CardContent>
                    <Typography component="div" sx={{ fontSize: 16 }}>
                        3. Launch
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 2}}>
                        When you download the deploy configuration, you will
                        have a ZIP file containing all the configuration
                        needed to launch TrustGraph in Docker Compose or
                        Podman Compose.
                        Unzip the ZIP file...
                        <pre>unzip deploy.zip
                        </pre>
                        and launch...
                        <pre>docker compose -f launch.yaml up -d
                        </pre>
                    </Typography>
                </CardContent>
            </Card>

        </>

    );

};

export default DeploymentInstructions;

