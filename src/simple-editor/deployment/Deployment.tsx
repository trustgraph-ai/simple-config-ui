import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { useConfigurationStateStore } from '../state/Configuration';
import {
    useOptionsStore, CONFIGURE_DOCUMENT_RAG
} from '../state/Options';

import DockerCompose from './DockerCompose';
import PodmanCompose from './PodmanCompose';
import Minikube from './Minikube';
import Gke from './Gke';
import Eks from './Eks';
import Aks from './Aks';

import DeploymentPlatform from './DeploymentPlatform';
import DeploymentModel from './DeploymentModel';
import DeploymentConfig from './DeploymentConfig';
import DeploymentInstructions from './DeploymentInstructions';
import DeploymentVectorStore from './DeploymentVectorStore';
import DeploymentGraphStore from './DeploymentGraphStore';
import DeploymentWorkbench from './DeploymentWorkbench';
import DeploymentGateway from './DeploymentGateway';
import DeploymentDocumentRag from './DeploymentDocumentRag';

interface DeploymentProps {
}

const getPlatformProcedure = (platform : string) => {

    const platforms = {
        "docker-compose": <DockerCompose/>,
        "podman-compose": <PodmanCompose/>,
        "minikube-k8s": <Minikube/>,
        "gcp-k8s": <Gke/>,
        "eks-k8s": <Eks/>,
        "aks-k8s": <Aks/>,
    };

    if (platform in platforms) return platforms[platform];

    return null;

}

const Deployment: React.FC<DeploymentProps> = ({
}) => {

    const platform = useConfigurationStateStore((state) => state.platform);

    const options = useOptionsStore((state) => state.options);

    const dualModelMode = useConfigurationStateStore(
        (state) => state.dualModelMode
    );

    const mainModel = useConfigurationStateStore((state) => state.mainModel);

    const ragModel = useConfigurationStateStore((state) => state.ragModel);

    let deploymentProcedures = [];

    deploymentProcedures.push(<DeploymentConfig/>);

    deploymentProcedures.push(getPlatformProcedure(platform));

    return (
        <Box className="deployment">
        {
            deploymentProcedures.map((c, ix) => <Box key={ix}>{c}</Box>)
        }
        </Box>
    );
    
/*
    return (
        <>
            <Box className="deployment">

                <Paper
                    elevation={8}
                    style={{
                        padding: '16px', marginTop: '16px',
                        marginBottom: '16px'
                    }}
                  >
                      <Typography variant="h6" gutterBottom>
                          {dualModelMode ? 'Extraction ' : ''}
                          Model Deployment
                      </Typography>
                    <Box>
                        <DeploymentModel
                            value={mainModel}
                        />
                    </Box>
                </Paper>

                {
                    dualModelMode && 
                    <Paper elevation={8} style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            RAG Model Deployment
                        </Typography>
                        <Box>
                            <DeploymentModel
                                value={ragModel}
                            />
                        </Box>
                    </Paper>
                }

                <Box>
                    <DeploymentVectorStore/>
                </Box>

                <Box>
                    <DeploymentGraphStore/>
                </Box>

                <Box>
                    <DeploymentConfig/>
                </Box>

                <Box>
                    <DeploymentGateway/>
                </Box>

                <Box>
                    <DeploymentWorkbench/>
                </Box>

                {
                    options.has(CONFIGURE_DOCUMENT_RAG) && (
                        <Box>
                            <DeploymentDocumentRag/>
                        </Box>
                    )
                }

                <Box>
                    <DeploymentInstructions/>
                </Box>

            </Box>
        </>
    );
*/
};

export default Deployment;
