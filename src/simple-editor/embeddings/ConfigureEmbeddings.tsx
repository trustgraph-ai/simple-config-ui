
import React from 'react';

import { Typography, Box, Stack, FormControl, InputLabel, Select,
    MenuItem,
} from '@mui/material';

type ModelDescriptor = { id : string, description : string };
type ModelCatalog = { [ix : string] : ModelDescriptor[] };

import modelsRaw from './models.json';
const models = modelsRaw as ModelCatalog;

import PromptControls from './PromptControls';
import PromptEditor from './PromptEditor';
import { usePromptsStore } from '../state/Prompts';

const ConfigureEmbeddings = ({
}) => {

const value = "BAAI/bge-small-en-v1.5";
const readOnly = false;


const onChange = () => {};

    const availModels = models["fastembed"];

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Embeddings
                </Typography>
                <FormControl fullWidth>

                    <InputLabel id="model-name-label">Model</InputLabel>
                <Select
                    labelId="model-name-label"
                    id="model-name-select"
                    value={value}
                    label="Model"
                    onChange={(e) => onChange(e.target.value)}
                    inputProps={{ readOnly: readOnly }}
                >
                    {
                        availModels.map(
                            (md) => (
                                <MenuItem key={md.id}
                                    value={md.id}>
                                    {md.description}
                                </MenuItem>
                            )
                        )
                    }
                    </Select>

                </FormControl>

            </Box>
            
        </Stack>

    </>);
};

export default ConfigureEmbeddings;

