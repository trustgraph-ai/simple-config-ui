
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

const ClaudeCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Anthropic Claude LLM">

            <DeploymentStep>
                To use Anthropic Claude, you need a Claude API key.
                Provide the Claude API key in an environment variable
                when runnging the Docker Compose configuration.
            </DeploymentStep>

            <DeploymentCode>
                kubectl -n trustgraph create secret \<br/>
                {'    '}generic claude-credentials \<br/>
                {'    '}--from-literal=claude-key=<span className="variable">CLAUDE_KEY</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default ClaudeCompose;

