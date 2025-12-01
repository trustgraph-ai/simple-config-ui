
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const VllmCompose: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="vLLM">

            <DeploymentStep>
                vLLM is a high-throughput, memory-efficient inference
                and serving engine for LLMs. Using PagedAttention and
                continuous batching, vLLM enables fully secure AI
                TrustGraph pipelines that aren't relying on any
                external APIs. No data is leaving the host environment
                or network.
                The vLLM service must be running with the required
                model loaded using <code>vllm serve</code>.
                The vLLM service URL must be provided in an environment
                variable.
            </DeploymentStep>

            <DeploymentEnvVars
                variables={[
                    {
                        name: "VLLM_BASE_URL",
                        value: "http://vllm-host:8000/v1"
                    }
                ]}
            />

            <DeploymentStep>
                Replace the URL with the URL of your vLLM service, noting the
                <code>v1</code> suffix.
            </DeploymentStep>

        </DeploymentSection>

    );

};

export default VllmCompose;

