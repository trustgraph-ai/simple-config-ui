
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const GoogleAiStudioKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Google AI Studio LLM">

            <DeploymentStep>
                To use Google AI Studio APIs, you need an API token which
                must be provided in an environment variable.
            </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic googleaistudio-credentials \<br/>
            {'    '}--from-literal=google-ai-studio-key=<span className="variable">GOOGLEAISTUDIO-KEY</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default GoogleAiStudioKube;

