
import React from 'react';

import { Typography } from '@mui/material';
import { Polyline } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const PineconeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Polyline color="primary" fontSize="large"/>}
            title="Pinecone VectorDB">

            <Typography variant="body2" sx={{ mt: 2 }}>
                To use Pinecone, you you need an API token which must
                be provided in a Kubernetes secret.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic pinecone-api-key \<br/>
            {'    '}--from-literal=pinecone-api-key=<span className="variable">PINECONE-API-KEY</span>
            </DeploymentCode>

        </DeploymentSection>
    );
};

export default PineconeCompose;

