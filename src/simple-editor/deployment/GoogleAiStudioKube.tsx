
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const GoogleAiStudioKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Google AI Studio LLM">

            <Typography variant="body2">
                To use Google AI Studio APIs, you need an API token which
                must be provided in an environment variable.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic googleaistudio-credentials \<br/>
            {'    '}--from-literal=google-ai-studio-key=<span className="variable">GOOGLEAISTUDIO-KEY</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default GoogleAiStudioKube;

