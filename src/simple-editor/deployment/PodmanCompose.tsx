
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const PodmanCompose: React.FC<{}> = ({
}) => {

    return (
        <>
            <DeploymentSection
                avatar={<Hub color="primary" fontSize="large"/>}
                title="Platform preparation">

                <DeploymentStep>
                    You need to have the Podman environment and Podman Compose
                    installed.  This should be available with your Linux
                    distriubution
                    See <a href="https://linuxhandbook.com/podman-compose/"
                        target="_blank">
                        Beginner's Guide to Using Podman Compose
                    </a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default PodmanCompose;

