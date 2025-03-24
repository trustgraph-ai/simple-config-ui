
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const BedrockCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="AWS Bedrock LLM">

            <Typography variant="body2">
                To use AWS Bedrock, you must have enabled models in the
                AWS Bedrock console.  You must also provide an
                AWS access key ID and secret key.
            </Typography>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "AWS_ACCESS_KEY_ID",
                        value: "ID-KEY-HERE"
                    },
                    {
                        name: "AWS_SECRET_ACCESS_KEY",
                        value: "TOKEN-GOES-HERE"
                    },
                    {
                        name: "AWS_DEFAULT_REGION",
                        value: "AWS-REGION-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default BedrockCompose;

