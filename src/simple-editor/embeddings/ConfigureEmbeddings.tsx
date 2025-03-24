
import React, { useEffect } from 'react';

import { Typography, Box, Stack, FormControl, FormLabel, InputLabel, Select,
    MenuItem, RadioGroup, FormControlLabel, Radio, ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

type ModelDescriptor = { id : string, description : string };
type ModelCatalog = { [ix : string] : ModelDescriptor[] };

import modelsRaw from './models.json';
const models = modelsRaw as ModelCatalog;

import PromptControls from './PromptControls';
import PromptEditor from './PromptEditor';
import { usePromptsStore } from '../state/Prompts';

import { useConfigurationStateStore } from '../state/Configuration';

const ConfigureEmbeddings = ({
}) => {

const value = "BAAI/bge-small-en-v1.5";
const readOnly = false;

    const embeddingsEngine = useConfigurationStateStore(
        (state) => state.embeddingsEngine
    );
        
    const embeddingsModel = useConfigurationStateStore(
        (state) => state.embeddingsModel
    );
        
    const doSetEmbeddingsEngine = useConfigurationStateStore(
        (state) => state.setEmbeddingsEngine
    );

    const setEmbeddingsEngine =
        (engine) => {

            doSetEmbeddingsEngine(engine);

            if (engine in models) {
                if (models[engine].length > 0) {
                    if (!(models[engine].includes(embeddingsModel))) {
                        setEmbeddingsModel(models[engine][0].id);
                    }
                }
            }

        };

    const setEmbeddingsModel = useConfigurationStateStore(
        (state) => state.setEmbeddingsModel
    );

    useEffect(() => {
        if ((embeddingsEngine != "fastembed") && 
            (embeddingsEngine != "huggingface")) {
            doSetEmbeddingsEngine("fastembed");
            setEmbeddingsModel(models["fastembed"][0].id);
        }
    });

    let availModels : ModelDescriptor[] = [];
    if (embeddingsEngine in models) {
        availModels = models[embeddingsEngine];
    }

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Embeddings
                </Typography>

                <Typography variant="h6" component="h3" gutterBottom>
                    Embeddings engine
                </Typography>

                <Grid container spacing={2} sx={{ m: 3 }}>

                    <Grid
                        size={2} display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Radio
                          checked={embeddingsEngine === 'fastembed'}
                          onChange={x => setEmbeddingsEngine(x.target.value)}
                          value="fastembed"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                    </Grid>
                    <Grid size={10}>
                        FastEmbed is a lightweight, fast, Python
                        library built for embedding generation, supporting
                        the popular text models.  Fastembed has a small
                        set of dependencies, resulting in a small container
                        image size and quick component start time.
                    </Grid>

                    <Grid
                        size={2} display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Radio
                          checked={embeddingsEngine === 'huggingface'}
                          onChange={x => setEmbeddingsEngine(x.target.value)}
                          value="huggingface"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                    </Grid>
                    <Grid size={10}>
                        HuggingFace sentence-transformers ships a component
                        with support for a large number of open / community
                        models.  Use this component to deploy non-standard
                        models.  Includes the PyTorch library, and other
                        large dependencies so has a large container
                        image size and longer component start time.
                    </Grid>

                </Grid>

                <Typography variant="h6" component="h3" gutterBottom>
                    Embeddings model
                </Typography>

                <FormControl sx={{maxWidth: "50"}}>

                    <InputLabel id="model-name-label">Model</InputLabel>

                    <Select
                        labelId="model-name-label"
                        id="model-name-select"
                        value={embeddingsModel}
                        label="Model"
                        onChange={(e) => setEmbeddingsModel(e.target.value)}
                        inputProps={{ readOnly: readOnly }}
                        sx={{minHeight: '3rem'}}
                    >
                        {
                            availModels.map(
                                (md) => (
                                    <MenuItem key={md.id}
                                        value={md.id}>
                                        <Box sx={{
                                        }}>
                                            <Typography variant="body2"
                                                sx={{ whiteSpace: 'wrap' }}
                                            >
                                                {md.description}
                                            </Typography>
                                        </Box>
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

