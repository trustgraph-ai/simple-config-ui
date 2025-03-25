
import React from 'react';

import { Polyline } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const PineconeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Polyline color="primary" fontSize="large"/>}
            title="Pinecone VectorDB">

            <DeploymentStep>
                To use Pinecone, you you need an API token which must
                be provided in an environment variable.  The API token
                can be created in the Pinecone console of your account.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "PINECONE_API_KEY",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>
    );
};

export default PineconeCompose;

