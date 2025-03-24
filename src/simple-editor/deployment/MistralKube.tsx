
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const MistralKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Mistral hosted LLM">

            <DeploymentStep>
                To use Mistral, you need a Mistral API key.
                Provide the Mistral API key in an environment variable
                when runnging the Docker Compose configuration.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic mistral-credentials \<br/>
            {'    '}--from-literal=mistral-key=<span className="variable">MISTRAL-TOKEN</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default MistralKube;

