
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const LmstudioKube: React.FC<{}> = () => {
    return (

        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LM Studio LLM">

            <Typography variant="body2">
                LMStudio service URL must be provided in a Kubernetes
                secret.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph \<br/>
            {'    '}create secret generic lmstudio-credentials \<br/>
            {'    '}--from-literal=lmstudio-url=<span className="variable">http://lmstudio:11434/</span>
            </DeploymentCode>

            <Typography variant="body2">
                Replace the URL with the URL of your LMStudio service.
            </Typography>

        </DeploymentSection>

    );

};

export default LmstudioKube;

