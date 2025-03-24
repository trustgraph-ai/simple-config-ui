
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const OpenaiKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="OpenAI LLMs">

            <Typography variant="body2">To use OpenAI APIs, you need an API token which must
            be provided in a Kubernetes secret.</Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic openai-credentials \<br/>
            {'    '}--from-literal=openai-token=<span className="variable">OPENAI-TOKEN-HERE</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default OpenaiKube;

