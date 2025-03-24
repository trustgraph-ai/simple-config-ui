
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const OllamaKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Ollama LLM">

            <Typography variant="body2">
                The Ollama service URL must be provided in a Kubernetes
                secret.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph \<br/>
            {'    '}create secret generic ollama-credentials \<br/>
            {'    '}--from-literal=ollama-host=<span className="variable">http://ollama:11434/</span>
            </DeploymentCode>

            <Typography variant="body2">
                Replace the URL with the URL of your Ollama service.
            </Typography>

        </DeploymentSection>

    );

};

export default OllamaKube;

