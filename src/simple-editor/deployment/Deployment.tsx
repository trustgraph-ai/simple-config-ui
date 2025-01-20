import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { useConfigurationStateStore } from '../state/Configuration';

import DeploymentPlatform from './DeploymentPlatform';
import DeploymentModel from './DeploymentModel';
import DeploymentConfig from './DeploymentConfig';
import DeploymentInstructions from './DeploymentInstructions';
import DeploymentVectorStore from './DeploymentVectorStore';
import DeploymentGraphStore from './DeploymentGraphStore';
import DeploymentWorkbench from './DeploymentWorkbench';
import DeploymentGateway from './DeploymentGateway';

interface DeploymentProps {
}

const Deployment: React.FC<DeploymentProps> = ({
}) => {

    const dualModelMode = useConfigurationStateStore(
        (state) => state.dualModelMode
    );

    const mainModel = useConfigurationStateStore((state) => state.mainModel);
//    const setMainModel = useConfigurationStateStore(
//        (state) => state.setMainModel
//    );

    const ragModel = useConfigurationStateStore((state) => state.ragModel);
//    const setRagModel = useConfigurationStateStore(
//        (state) => state.setRagModel
//    );

    return (
        <>
            <Box className="deployment">

                <Box>
                    <DeploymentPlatform/>
                </Box>

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

                <Box>
                    <DeploymentInstructions/>
                </Box>

            </Box>
        </>
    );
};

export default Deployment;
