
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const Eks: React.FC<{}> = ({
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
                    See <a href="https://aws.amazon.com/eks/" target="_blank">Amazon Elastic Kubernetes Service</a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default Eks;

