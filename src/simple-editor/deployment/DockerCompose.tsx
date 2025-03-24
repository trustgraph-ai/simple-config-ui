
import React from 'react';

import { Hub } from '@mui/icons-material';

import DeploymentStep from './DeploymentStep';
import DeploymentSection from './DeploymentSection';

const DockerCompose: React.FC<{}> = ({
}) => {

    return (
        <>
            <DeploymentSection
                avatar={<Hub color="primary" fontSize="large"/>}
                title="Platform preparation">

                <DeploymentStep>
                    You need to have Docker Compose installed.
                    See <a href="https://docs.docker.com/compose/install/"
                        target="_blank">
                        Installing Docker Compose
                    </a>.
                </DeploymentStep>

            </DeploymentSection>
        </>
    );

};

export default DockerCompose;

