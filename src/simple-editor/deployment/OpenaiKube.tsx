
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const OpenaiKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="OpenAI LLMs">

            <DeploymentStep>
                To use OpenAI APIs, you need an API token which must
                be provided in a Kubernetes secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic openai-credentials \<br/>
            {'    '}--from-literal=openai-token=<span className="variable">OPENAI-TOKEN-HERE</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default OpenaiKube;

