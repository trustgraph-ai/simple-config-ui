
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const AzureOpenaiCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Azure OpenAI LLM">
            <Typography variant="body2">
                To use Azure's OpenAI APIs, you need to have a serverless
                OpenAI endpoint deployed, and you must also provide an endpoint
                token as an environment variable. In addition, the OpenAI API
                requires an API Version and Model Name to be set. The Model
                Name is set by the user, during the deployment within AzureAI.
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
                    },
                    {
                        name: "API_VERSION",
                        value: "API-VERSION-GOES-HERE"
                    },
                    {
                        name: "OPENAI_MODEL",
                        value: "USER-DEFINED-MODEL-NAME-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default AzureOpenaiCompose;

