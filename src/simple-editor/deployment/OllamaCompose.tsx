
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const OllamaCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Ollama LLM">

            <Typography variant="body2">
                The power of Ollama is the flexibility it provides in
                Language Model deployments. Being able to run LMs with
                Ollama enables fully secure AI TrustGraph pipelines
                that aren't relying on any external APIs. No data is
                leaving the host environment or network.
                The Ollama service must be running, and have required
                models available using <code>ollama pull</code>.
                The Ollama service URL must be provided in an environment
                variable.
            </Typography>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "OLLAMA_HOST",
                        value: "http://ollama-host:11434"
                    }
                ]}
            />

            <Typography variant="body2">
                Replace the URL with the URL of your Ollama service.
            </Typography>

        </DeploymentSection>

    );

};

export default OllamaCompose;

