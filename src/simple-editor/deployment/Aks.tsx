
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const Aks: React.FC<{}> = ({
}) => {

    return (
        <>
            <DeploymentSection
                avatar={<Hub color="primary" fontSize="large"/>}
                title="Platform preparation">

                <DeploymentStep>
                    You need to have an Azure account, and a
                    running AKS cluster.  You also need to be authenticated
                    with the cluster and be able to see the cluster
                    state.
                    See <a href="https://azure.microsoft.com/en-us/products/kubernetes-service" target="_blank">Azure Kubernetes Service (AKS)</a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default Aks;

