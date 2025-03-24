
import React from 'react'

import { Typography } from '@mui/material';

interface DeploymentStepProps extends React.PropsWithChildren {
    children : React.ReactNode;
};

const DeploymentStep : React.FC<DeploymentStepProps> = ({children}) => {
    return (
        <Typography variant="body2" mt={1} mb={1}>
            {children}
        </Typography>
    );
}

export default DeploymentStep;

