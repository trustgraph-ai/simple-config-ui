
import React from 'react';

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
  const [selectedValue, setSelectedValue] = React.useState('pdf-decode');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

    const embeddingsEngine = useConfigurationStateStore(
        (state) => state.embeddingsEngine
    );
        
    const setEmbeddingsEngine = useConfigurationStateStore(
        (state) => state.setEmbeddingsEngine
    );

    if ((embeddingsEngine != "fastembed") && 
        (embeddingsEngine != "huggingface"))
        setEmbeddingsEngine("fastembed");

    let availModels : ModelDescriptor[] = [];

    if (embeddingsEngine in models)
        availModels = models[embeddingsEngine];

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Embeddings
                </Typography>

                <Typography variant="h6" component="h3" gutterBottom>
                    Embeddings enginer
                </Typography>

                <Grid container spacing={2} sx={{ m: 3 }}>

                    <Grid
                        size={2} display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Radio
                          checked={selectedValue === 'fastembed'}
                          onChange={x => setEmbeddingsEngine(x.target.value)}
                          value="fastembed"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                    </Grid>
                    <Grid size={10}>
                        PDF decode, no OCR: the basic decode extracts text
                        from PDF documents containing structured text
                    </Grid>

                    <Grid
                        size={2} display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Radio
                          checked={selectedValue === 'huggingface'}
                          onChange={x => setEmbeddingsEngine(x.target.value)}
                          value="huggingface"
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                    </Grid>
                    <Grid size={10}>
                        OCR processing with Tesseract.  Tesseract is a free,
                        embedded OCR engine.  It is best-in-class free /
                        open-source.  Use this with PDF documents containing
                        image scans, to perform Optical Character Recognition
                        to detect text.
                    </Grid>

                </Grid>

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

