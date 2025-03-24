
import { Plumbing } from '@mui/icons-material';

import {
    Button, Typography, Alert, Paper, Box, Stack,
} from '@mui/material';

import { Check } from '@mui/icons-material';

import { useConfigurationStateStore } from '../state/Configuration';
import { useDeploymentStore } from '../state/Deployment';

const PreparedConfig = () => {

    const graphStore
        = useConfigurationStateStore((state) => state.graphStore);
    const vectorDB
        = useConfigurationStateStore((state) => state.vectorDB);

    const dualModelMode = useConfigurationStateStore(
        (state) => state.dualModelMode
    );

    const mainModel = useConfigurationStateStore((state) => state.mainModel);
    const ragModel = useConfigurationStateStore((state) => state.ragModel);

    const configUrl
        = useDeploymentStore((state) => state.configUrl);

    const download = () => {

    if (!configUrl) return;
        let alink = document.createElement("a");
        alink.href = configUrl;
        alink.download = "deploy.zip";
        alink.click();
    };

    return (
        <>

            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                    >
                        <Plumbing color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Deployment Configuration
                        </Typography>
                    </Stack>

                    <Alert icon={<Check fontSize="inherit"/>}
                        sx={{ mt: 1, mb: 2}}
                        severity="success"
                    >
                        Configuration generation was successful
                    </Alert>

                    <ul>
                        <li>Model deployment: {mainModel.deployment}</li>
                        <li>Model name: {mainModel.modelName}</li>
                        {
                           dualModelMode &&
                           <>
                               <li>
                                   RAG deployment: {ragModel.deployment}
                               </li>
                               <li>
                                   RAG model name: {ragModel.modelName}
                               </li>
                        </>
                        }
                        <li>Graph store: {graphStore}</li>
                        <li>Vector DB: {vectorDB}</li>
                    </ul>

                    <Button variant="outlined" onClick={() => download()}>
                        Download
                    </Button>
                </Paper>
            </Box>

        </>
    );
}

export default PreparedConfig;

