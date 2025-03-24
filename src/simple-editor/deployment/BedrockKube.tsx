
import React from 'react';

import { Typography } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const BedrockKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="AWS Bedrock LLM">

            <Typography variant="body2">
                To use AWS Bedrock, you must have enabled models in the
                AWS Bedrock console.  You must also provide an
                AWS access key ID and secret key as a Kubernetes secret
                before deploying the application.
            </Typography>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic bedrock-credentials \<br/>
            {'    '}--from-literal=aws-id-key=<span className="variable">AWS-ID-KEY</span> \<br/>
            {'    '}--from-literal=aws-secret=<span className="variable">AWS-SECRET-KEY</span> \<br/>
            {'    '}--from-literal=aws-region=<span className="variable">AWS-REGION-HERE</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default BedrockKube;

