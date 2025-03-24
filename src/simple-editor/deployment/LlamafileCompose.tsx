
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const LlamafileCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="LlamaFile LLM">

            <DeploymentStep>
                To use Llamafile, you must have a Llamafile services running
                on an accessible host.  The Llamafile host must be provided
                in an environment variable.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "LLAMAFILE_URL",
                        value: "LLAMAFILE-URL"
                    }
                ]}
            />

        </DeploymentSection>

    );

};

export default LlamafileCompose;

