
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const VllmKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="vLLM">

            <DeploymentStep>
                The vLLM service URL must be provided in a Kubernetes
                secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph \<br/>
            {'    '}create secret generic vllm-credentials \<br/>
            {'    '}--from-literal=vllm-url=<span className="variable">http://vllm:8000/v1</span>
            </DeploymentCode>

            <DeploymentStep>
                Replace the URL with the URL of your vLLM service.
            </DeploymentStep>

        </DeploymentSection>

    );

};

export default VllmKube;

