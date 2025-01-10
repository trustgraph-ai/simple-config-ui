
import React from 'react';

import { Psychology } from '@mui/icons-material';
import {
    Typography, Paper, Box, Stack,
} from '@mui/material';

import {
    useConfigurationStateStore, ModelParams
} from '../state/Configuration';

import DeploymentModelCompose from './DeploymentModelCompose';
import DeploymentModelKube from './DeploymentModelKube';

const Platform : React.FC<{ value : ModelParams }> = ({
    value
}) => {

    const platform = useConfigurationStateStore((state) => state.platform);

    if (platform == "docker-compose" || platform == "podman-compose") {
        return <DeploymentModelCompose value={value}/>;
    } else if (platform == "minikube-k8s" || platform == "gcp-k8s") {
        return <DeploymentModelKube value={value}/>;
    } else {
        return <div>FIXME: Platform not expected?!</div>;
    }

}

interface DeploymentModelProps {
    value : ModelParams;
//    setValue : (m : ModelParams) => void;
}

const DeploymentModel: React.FC<DeploymentModelProps> = ({
    value, // setValue,
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
                    <Platform value={value}/>
                </Paper>
            </Box>
        </>

    );
};

export default DeploymentModel;

