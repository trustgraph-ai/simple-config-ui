
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const OpenaiCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LlamaFile LLM">

            <Typography variant="body2">
                To use OpenAI APIs, you need an API
                token which must be provided in an environment variable.
            </Typography>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "OPENAI_TOKEN",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default OpenaiCompose;

