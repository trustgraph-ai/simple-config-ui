
import React from 'react';

import { RocketLaunch } from '@mui/icons-material';

import { useConfigurationStateStore } from '../state/Configuration';
import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const ApplicationCompose: React.FC<{}> = () => {

    const platform = useConfigurationStateStore((state) => state.platform);

    return (
        <DeploymentSection
            avatar={<RocketLaunch color="primary" fontSize="large"/>}
            title="Application deploy">

            <DeploymentStep>

                When you download the deploy configuration, you will
                have a ZIP file containing all the configuration
                needed to launch TrustGraph in
                {
                    platform == "podman-compose" ? 
                    " Podman Compose" :
                    " Docker Compose"
                }.
                Unzip the ZIP file:

            </DeploymentStep>

            <DeploymentCode>
                unzip deploy.zip
            </DeploymentCode>

            <DeploymentStep>

            On MacOS, it may be necessary to specify a destination directory for the TrustGraph package:

            </DeploymentStep>

            <DeploymentCode>
                unzip deploy.zip -d deploy
            </DeploymentCode>

            <DeploymentStep>

                Navigate to the <code>docker-compose</code> directory. From this directory, launch TrustGraph with:

            </DeploymentStep>

            <DeploymentCode>
                {platform == "podman-compose" ? "podman compose" : "docker compose" } -f docker-compose.yaml up -d
            </DeploymentCode>

            <DeploymentStep>

                If you are on Linux, running SELinux, you may need
                to change permissions on files in the deploy bundle
                so that they are accessible from within containers.
                This affects
                the <code>grafana</code> and <code>prometheus</code> directories.
            </DeploymentStep>

            <DeploymentCode>
                chcon -Rt svirt_sandbox_file_t grafana prometheus<br/>
                chmod 755 prometheus/ grafana/ grafana/*/<br/>
                chmod 644 prometheus/* grafana/*/*
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default ApplicationCompose;

