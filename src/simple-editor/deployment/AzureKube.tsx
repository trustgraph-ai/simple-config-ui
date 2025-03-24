
import React from 'react';

import { Psychology } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const AzureKube: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Psychology color="primary" fontSize="large"/>}
            title="Azure Endpoint LLM">

            <DeploymentStep>
                To use Azure Serverless APIs, you need to have a serverless
                endpoint deployed.  You must also provide
                an Azure endpoint and token in a Kubernetes secret before
                launching the application.
             </DeploymentStep>

            <DeploymentCode>
            kubectl -n trustgraph create secret \<br/>
            {'    '}generic azure-credentials \<br/>
            {'    '}--from-literal=azure-endpoint=<span className="variable">AZURE-ENDPOINT</span> \<br/>
            {'    '}--from-literal=azure-token=<span className="variable">AZURE-TOKEN</span>
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default AzureKube;

