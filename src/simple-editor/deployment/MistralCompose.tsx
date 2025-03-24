
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const MistralCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Mistral APIs">

            <DeploymentStep>
                To use Mistral, you need a Mistral API key.
                Provide the Mistral API key in an environment variable
                when runnging the Docker Compose configuration.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "MISTRAL_TOKEN",
                        value: "TOKEN-GOES-HERE"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default MistralCompose;

