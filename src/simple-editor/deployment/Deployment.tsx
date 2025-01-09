import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { useModelParamsStore } from '../state/ModelParams';
import { useOptionsStore, CONFIGURE_WORKBENCH } from '../state/Options';

import DeploymentPlatform from './DeploymentPlatform';
import DeploymentModel from './DeploymentModel';
import DeploymentConfig from './DeploymentConfig';
import DeploymentInstructions from './DeploymentInstructions';
import DeploymentVectorStore from './DeploymentVectorStore';
import DeploymentGraphStore from './DeploymentGraphStore';
import DeploymentWorkbench from './DeploymentWorkbench';

interface DeploymentProps {
}

const Deployment: React.FC<DeploymentProps> = ({
}) => {

    const options = useOptionsStore((state) => state.options);
    const dualModelMode = useModelParamsStore((state) => state.dualModelMode);
    const extractionModelDeployment = useModelParamsStore((state) => state.extractionModelDeployment);
    const extractionModelName = useModelParamsStore((state) => state.extractionModelName);
    const extractionTemperature = useModelParamsStore((state) => state.extractionTemperature);
    const extractionMaxOutputTokens = useModelParamsStore((state) => state.extractionMaxOutputTokens);
    const ragModelDeployment = useModelParamsStore((state) => state.ragModelDeployment);
    const ragModelName = useModelParamsStore((state) => state.ragModelName);
    const ragTemperature = useModelParamsStore((state) => state.ragTemperature);
    const ragMaxOutputTokens = useModelParamsStore((state) => state.ragMaxOutputTokens);
    const modelDeployment = useModelParamsStore((state) => state.modelDeployment);

    return (
        <>
            <Box className="deployment">

                <Box>
                    <DeploymentPlatform/>
                </Box>

                {dualModelMode ? (
                    <>
                        <Paper elevation={8} style={{ padding: '16px', marginTop: '16px', marginBottom: '16px' }}>
                            <Typography variant="h6" gutterBottom>Extraction Model Deployment</Typography>
                            <Box>
                                <DeploymentModel
                                    modelDeployment={extractionModelDeployment}
                                    modelName={extractionModelName}
                                    temperature={extractionTemperature}
                                    maxOutputTokens={extractionMaxOutputTokens}
                                />
                            </Box>
                        </Paper>
                        <Paper elevation={8} style={{ padding: '16px' }}>
                            <Typography variant="h6" gutterBottom>RAG Model Deployment</Typography>
                            <Box>
                                <DeploymentModel
                                    modelDeployment={ragModelDeployment}
                                    modelName={ragModelName}
                                    temperature={ragTemperature}
                                    maxOutputTokens={ragMaxOutputTokens}
                                />
                            </Box>
                        </Paper>
                    </>
                ) : (
                    <Box>
                        <DeploymentModel
                            modelDeployment={modelDeployment}
                        />
                    </Box>
                )}

                <Box>
                    <DeploymentVectorStore/>
                </Box>

                <Box>
                    <DeploymentGraphStore/>
                </Box>

                <Box>
                    <DeploymentConfig/>
                </Box>

                {
                    options.has(CONFIGURE_WORKBENCH) && (
                        <Box>
                            <DeploymentWorkbench/>
                        </Box>
                    )
                }

                <Box>
                    <DeploymentInstructions/>
                </Box>

            </Box>
        </>
    );
};

export default Deployment;
