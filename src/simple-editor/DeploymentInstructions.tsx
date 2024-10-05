
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

                    <Typography variant="body2">

                        If you are on Linux, running SELinux, you may need
                        to change permissions on files in the deploy bundle
                        so that they are accessible from within containers.
                        This affects the <code>grafana</code> and
                        <code>prometheus</code> directories.
                        
                        <pre>chcon -Rt svirt_sandbox_file_t grafana prometheus
                        chmod 755 prometheus/ grafana/ grafana/*/
                        chmod 644 prometheus/* grafana/*/*
                        </pre>

                    </Typography>

                </CardContent>
            </Card>

        </>

    );

};

export default DeploymentInstructions;

