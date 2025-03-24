
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const AzureCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Azure Endpoint LLM">

            <Typography variant="body2">
                To use Azure Serverless APIs, you need to have a serverless
                endpoint deployed, and you must also provide an endpoint
                token as an environment variable.
             </Typography>


            <DeploymentEnvVars
                variables={[
                    {
                        name: "AZURE_ENDPOINT",
                        value: "https://ENDPOINT.API.HOST.GOES.HERE/"
                    },
                    {
                        name: "AZURE_TOKEN",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default AzureCompose;

