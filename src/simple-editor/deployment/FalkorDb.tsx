
import React from 'react';

import { Typography, Paper } from '@mui/material';
import { Gavel } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';

const FalkorDb: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Gavel color="primary" fontSize="large"/>}
            title="FalkorDB graph store">

            <Typography variant="body2" sx={{ mt: 2 }}>
                FalkorDB is licensed under
                the <a href="https://github.com/FalkorDB/FalkorDB/blob/master/LICENSE.txt">
                    Server Side Public License (SSPLv1)
                </a>.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
            <Paper elevation={8} sx={{ p: 2 }}>
                "The Server Side Public License (SSPLv1) is designed to
                ensure that if you use FalkorDB as part of a service you
                make available to others (e.g., in the cloud or as an
                API), you are required to make the source code of your
                complete service available under the SSPLv1 license. This
                is similar to GPL but extends to server use."
            </Paper>
            </Typography>

        </DeploymentSection>
    );
};

export default FalkorDb;

