
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const ClaudeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Anthropic Claude LLM">

            <DeploymentStep>
                To use Anthropic Claude, you need a Claude API key.
                Provide the Claude API key in an environment variable
                when runnging the Docker Compose configuration.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "CLAUDE_KEY",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default ClaudeCompose;

