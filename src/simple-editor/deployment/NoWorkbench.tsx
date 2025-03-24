
import React from 'react';

import { Typography, Alert } from '@mui/material';
import { Insights } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const Workbench: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Insights color="primary" fontSize="large"/>}
            title="Demo Workbench">

                <Alert severity="info">
                    You have selected to deploy <strong>without</strong> the
                    Demo Workbench. The Demo Workbench provides a UI
                    for trialling TrustGraph performance and features. You
                    can add the Demo Workbench to the deployment on
                    the <strong>CUSTOMIZATION</strong> tab.
                </Alert>

        </DeploymentSection>

    );

};

export default Workbench;

