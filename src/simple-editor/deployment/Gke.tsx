
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const Gke: React.FC<{}> = ({
}) => {

    return (
        <>
            <DeploymentSection
                avatar={<Hub color="primary" fontSize="large"/>}
                title="Platform preparation">

                <DeploymentStep>
                    You need to have a Google Cloud account, and a
                    running GKE cluster.  You also need to be authenticated
                    with the cluster and be able to see the cluster
                    state.
                    See <a href="https://cloud.google.com/kubernetes-engine"
                    target="_blank">Google Kubernetes Engine (GKE)</a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default Gke;

