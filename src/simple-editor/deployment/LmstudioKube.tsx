
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const LmstudioKube: React.FC<{}> = () => {
    return (

        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LM Studio LLM">

            <DeploymentStep>
                LMStudio service URL must be provided in a Kubernetes
                secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph \<br/>
            {'    '}create secret generic lmstudio-credentials \<br/>
            {'    '}--from-literal=lmstudio-url=<span className="variable">http://lmstudio:11434/</span>
            </DeploymentCode>

            <DeploymentStep>
                Replace the URL with the URL of your LMStudio service.
            </DeploymentStep>

        </DeploymentSection>

    );

};

export default LmstudioKube;

