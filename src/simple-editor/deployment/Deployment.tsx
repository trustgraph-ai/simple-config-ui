
import React from 'react';

import { Box } from '@mui/material';

//import { useModelParamsStore } from '../state/ModelParams';
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

    return (

        <>

            <Box className="deployment">

                <Box>
                    <DeploymentPlatform/>
                </Box>

                <Box>
                    <DeploymentModel/>
                </Box>

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

