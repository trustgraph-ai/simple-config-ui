
import React from 'react';

import {
    Typography, Box, Paper, Stack,
} from '@mui/material';
import { Insights } from '@mui/icons-material';

import DeploymentCode from './DeploymentCode';
import DeploymentStep from './DeploymentStep';

const DeploymentDocumentRag: React.FC<{}> = ({
}) => {

    return (

        <>

            <Box>
                <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        sx={{mb: 2}}
                    >
                        <Insights color="primary" fontSize="large"/>
                        <Typography variant="h6" component="h3">
                            Document RAG
                        </Typography>
                    </Stack>

                    <DeploymentStep>

                        Document RAG APIs are separate from GraphRAG.
                        You can use the `tg-invoke-document-rag` to test
                        Document RAG processing once documents are loaded:
                    </DeploymentStep>

                    <DeploymentCode>
                        tg-invoke-document-rag -q "Describe a cat"
                    </DeploymentCode>

                </Paper>
            </Box>

        </>

    );

};

export default DeploymentDocumentRag;

