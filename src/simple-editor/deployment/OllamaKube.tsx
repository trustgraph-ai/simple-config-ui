
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const OllamaKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Ollama LLM">

            <DeploymentStep>
                The Ollama service URL must be provided in a Kubernetes
                secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph \<br/>
            {'    '}create secret generic ollama-credentials \<br/>
            {'    '}--from-literal=ollama-host=<span className="variable">http://ollama:11434/</span>
            </DeploymentCode>

            <DeploymentStep>
                Replace the URL with the URL of your Ollama service.
            </DeploymentStep>

        </DeploymentSection>

    );

};

export default OllamaKube;

