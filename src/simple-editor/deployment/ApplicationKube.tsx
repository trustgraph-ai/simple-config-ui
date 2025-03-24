
import React from 'react';

import { Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const ApplicationKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<RocketLaunch color="primary" fontSize="large"/>}
            title="Application deploy">

            <DeploymentStep>
                To deploy to Kubernetes, you likely need to have Kubernetes
                credentials set up to connect to the Kubernetes management
                service.  The mechanism to do this varies with the different
                kinds of Kubernetes services in use, check with your cloud
                provider documentation.
            </DeploymentStep>

            <DeploymentStep>
                When you download the deploy configuration, you will
                have a ZIP file containing all the configuration
                needed to launch TrustGraph on Kubernetes.
                Unzip the ZIP file...
            </DeploymentStep>

            <DeploymentCode>
                unzip deploy.zip
            </DeploymentCode>

            <DeploymentStep>
                and launch...
            </DeploymentStep>

            <DeploymentCode>
                kubectl apply -f resources.yaml
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default ApplicationKube;

