
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const GoogleAiStudioCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Google AI Studio LLM">

            <DeploymentStep>
                To use Google AI Studio APIs, you need an API token which
                must be provided in an environment variable.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "GOOGLE_AI_STUDIO_KEY",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default GoogleAiStudioCompose;

