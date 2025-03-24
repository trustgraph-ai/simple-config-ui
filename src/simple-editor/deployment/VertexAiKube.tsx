
import React from 'react';

import { Alert } from '@mui/material';
import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const VertexAiKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Google Cloud VertexAI LLM">

            <DeploymentStep>
                To use VertexAI, you need to have a Google Cloud credential
                file provisioned for a service account which has access to the
                VertexAI services.  This means signing up to GCP and using
                an existing, or launching a new GCP project.
                The GCP credential will be a JSON file
                which would arrive in a file called <code>private.json</code>.
            </DeploymentStep>

            <DeploymentStep>
                The private.json file should be loaded into Kubernetes as a
                secret.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic vertexai-creds --from-file=private.json=private.json
            </DeploymentCode>

            <Alert severity="warning">
                Google Cloud private.json files are secrets which potentially
                provide access to all of your Google Cloud resources.
                Take great care to ensure that the permissions of the
                account are minimal, ideally scope to just AI services.
            </Alert>

        </DeploymentSection>

    );

};

export default VertexAiKube;

