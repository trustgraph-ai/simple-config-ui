
import React from 'react';

import { Typography, Box, Stack } from '@mui/material';

import PromptControls from './PromptControls';
import PromptEditor from './PromptEditor';
import { usePromptsStore } from '../state/Prompts';

const ConfigureEmbeddings = ({
}) => {

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Embeddings
                </Typography>

            </Box>
            
        </Stack>

    </>);
};

export default ConfigureEmbeddings;

