
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const CohereKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Cohere LLM">

            <DeploymentStep>
                To use Cohere APIs, you need an API token which must
                be provided in a Kubernetes secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic cohere-credentials \<br/>
            {'    '}--from-literal=cohere-key=<span className="variable">COHERE-KEY</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default CohereKube;

