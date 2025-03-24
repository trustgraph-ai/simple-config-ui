
import React from 'react';

import { Polyline } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const PineconeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Polyline color="primary" fontSize="large"/>}
            title="Pinecone VectorDB">

            <DeploymentStep>
                To use Pinecone, you you need an API token which must
                be provided in a Kubernetes secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic pinecone-api-key \<br/>
            {'    '}--from-literal=pinecone-api-key=<span className="variable">PINECONE-API-KEY</span>
            </DeploymentCode>

        </DeploymentSection>
    );
};

export default PineconeCompose;

