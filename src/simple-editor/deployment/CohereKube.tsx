
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const CohereKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Cohere LLM">

            <Typography variant="body2">
                To use Cohere APIs, you need an API token which must
                be provided in a Kubernetes secret.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic cohere-credentials \<br/>
            {'    '}--from-literal=cohere-key=<span className="variable">COHERE-KEY</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default CohereKube;

