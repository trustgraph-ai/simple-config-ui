
import React from 'react';

import { Typography } from '@mui/material';
import { Polyline } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const PineconeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Polyline color="primary" fontSize="large"/>}
            title="Pinecone VectorDB">

            <Typography variant="body2" sx={{ mt: 2 }}>
                To use Pinecone, you you need an API token which must
                be provided in an environment variable.  The API token
                can be created in the Pinecone console of your account.
            </Typography>

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

