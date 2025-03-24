
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const CohereCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Cohere LLM">

            <Typography variant="body2">
                To use Cohere APIs, you need an API token which must
                be provided in an environment variable.
            </Typography>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "COHERE_KEY",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default CohereCompose;

