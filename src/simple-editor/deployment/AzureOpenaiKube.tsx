
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const AzureOpenaiKube: React.FC<{}> = () => {
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

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic azure-openai-credentials \<br/>
            {'    '}--from-literal=azure-endpoint=<span className="variable">https://ENDPOINT.API.HOST.GOES.HERE/</span> \<br/>
            {'    '}--from-literal=azure-token=<span className="variable">TOKEN-GOES-HERE</span> \<br/>
            {'    '}--from-literal=api-version=<span className="variable">API-VERSION-GOES-HERE</span> \<br/>
            {'    '}--from-literal=openai-model=<span className="variable">USER-DEFINED-MODEL-NAME-HERE</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default AzureOpenaiKube;

