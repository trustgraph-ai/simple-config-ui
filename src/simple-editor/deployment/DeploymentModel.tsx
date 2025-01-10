
import React from 'react';

import { Psychology } from '@mui/icons-material';
import {
    Typography, Paper, Box, Stack,
} from '@mui/material';

import { useConfigurationStateStore } from '../state/Configuration';

import DeploymentModelCompose from './DeploymentModelCompose';
import DeploymentModelKube from './DeploymentModelKube';

const Platform : React.FC<{ thisDeploy : string }> = ({
    thisDeploy
}) => {

    const platform = useConfigurationStateStore((state) => state.platform);

    if (platform == "docker-compose" || platform == "podman-compose") {
        return <DeploymentModelCompose thisDeploy={thisDeploy}/>;
    } else if (platform == "minikube-k8s" || platform == "gcp-k8s") {
        return <DeploymentModelKube thisDeploy={thisDeploy}/>;
    } else {
        return <div>Bunch</div>;
    }

}

interface DeploymentModelProps {
   thisDeploy : string;
}

const DeploymentModel: React.FC<DeploymentModelProps> = ({
    thisDeploy
}) => {

    return (

        <>
            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Typography variant="h6" component="h3">
                        <Stack
                            direction="row" spacing={2}
                            alignItems="center"
                            sx={{mt: 2, mb: 2}}
                        >
                            <Psychology color="primary" fontSize="large"/>
                            <Box>Model Credentials</Box>
                        </Stack>
                    </Typography>
                    <Platform thisDeploy={thisDeploy}/>
                </Paper>
            </Box>
        </>

    );
};

export default DeploymentModel;

