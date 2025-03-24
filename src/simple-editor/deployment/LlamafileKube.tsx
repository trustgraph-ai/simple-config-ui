
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const LlamafileKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LlamaFile LLM">

            <Typography variant="body2">
                To use Llamafile, you must have a Llamafile services running
                on an accessible host.  The Llamafile host must be provided
                in a Kubernetes secret.
             </Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic llamafile-credentials \<br/>
            {'    '}--from-literal=llamafile-url=<span className="variable">http://llamafile:1234/</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default LlamafileKube;

