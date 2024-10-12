
import React from 'react';

import { Box } from '@mui/material';

//import { useModelParamsStore } from '../state/ModelParams';

import DeploymentModel from './DeploymentModel';
import DeploymentConfig from './DeploymentConfig';
import DeploymentInstructions from './DeploymentInstructions';

interface DeploymentProps {
}

const Deployment: React.FC<DeploymentProps> = ({
}) => {

  return (

      <>

          <Box>
              <DeploymentModel/>
          </Box>

          <Box>
              <DeploymentConfig/>
          </Box>

          <Box>
              <DeploymentInstructions/>
          </Box>

      </>

  );
};

export default Deployment;

