
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const Minikube: React.FC<{}> = ({
}) => {

    return (
        <>
            <DeploymentSection
                avatar={<Hub color="primary" fontSize="large"/>}
                title="Platform preparation">

                <DeploymentStep>
                    You need to have the Minikube cluster installed and
                    running.
                    See <a href="https://minikube.sigs.k8s.io/docs/start"
                        target="_blank">
                        Minikube - Get Started!
                    </a>.  There is TrustGraph documentation on
                    Minikube <a href="https://trustgraph.ai/docs/running/minikube" target="_blank">here</a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default Minikube;

