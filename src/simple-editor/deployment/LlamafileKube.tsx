
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const LlamafileKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LlamaFile LLM">

            <DeploymentStep>
                To use Llamafile, you must have a Llamafile services running
                on an accessible host.  The Llamafile host must be provided
                in a Kubernetes secret.
             </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic llamafile-credentials \<br/>
            {'    '}--from-literal=llamafile-url=<span className="variable">http://llamafile:1234/</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default LlamafileKube;

