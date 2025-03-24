
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const VertexAiCompose: React.FC<{}> = () => {
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
                which should be stored in <code>vertexai/private.json</code>.
            </DeploymentStep>

            <DeploymentStep>
                The credential file is mounted as a volume in Docker Compose,
                which can cause issues with SELinux if you are running on
                Linux.  Make sure that Docker has access to volume files if
                this affects you.
            </DeploymentStep>

            <DeploymentCode>
                chcon -Rt svirt_sandbox_file_t vertexai/
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default VertexAiCompose;

