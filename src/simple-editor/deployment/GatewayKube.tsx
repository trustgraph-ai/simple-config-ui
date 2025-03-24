
import React from 'react';

import { Insights } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const BedrockKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Insights color="primary" fontSize="large"/>}
            title="API gateway">

            <DeploymentStep>
                The API Gateway is a required component which supports the CLI
                and Test Suite. The API Gateway must be configured with a
                secret key. However, that secret key can be empty if no
                authentication is required. The Test Suite does not currently
                use keys for authentication. The below example shows how to
                set the API Gateway secret to be empty with no authentication.
            </DeploymentStep>

            <DeploymentCode>
                kubectl -n trustgraph create secret \<br/>
                {'    '}generic gateway-secret \<br/>
                {'    '}--from-literal=gateway-secret=
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default BedrockKube;

