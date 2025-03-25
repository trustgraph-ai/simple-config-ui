
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const LmstudioCompose: React.FC<{}> = () => {
    return (

        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LM Studio LLM">

            <DeploymentStep>
                LMStudio allows you to run models locally, with a nice UX.
                The LMStudio application or service must be running,
                and have the REST API enabled, and model made available
                by pulling from the model repository.
            </DeploymentStep>

            <DeploymentStep>
                Note that LMStudio is a commercial product - a licence is
                needed for non-personal usage.
                See <a href="https://lmstudio.ai/work">lmstudio.ai/work</a>
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "LMSTUDIO_URL",
                        value: "http://localhost:1234"
                    }
                ]}
            />

            <DeploymentStep>
                Replace the URL with the URL of your LMStudio API service.
            </DeploymentStep>

        </DeploymentSection>

    );

};

export default LmstudioCompose;

