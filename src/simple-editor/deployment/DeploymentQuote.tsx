
import React from 'react'

import { Typography } from '@mui/material';

interface DeploymentQuoteProps extends React.PropsWithChildren {
    children : React.ReactNode;
};

const DeploymentQuote : React.FC<DeploymentQuoteProps> =
({children}) => {
    return (
        <Typography
            variant="body2"
            sx={{
                backgroundColor: '#f9fcff',
                p: '1rem',
                m: '1rem',
                border: '1px solid #e0e0e0',
            }}
        >
            {children}
        </Typography>
    );
}

export default DeploymentQuote;

