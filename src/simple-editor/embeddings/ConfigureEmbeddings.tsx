
import { useEffect } from 'react';

import { Typography, Box, Stack, FormControl, InputLabel, Select,
    MenuItem, Radio,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

type ModelDescriptor = { id : string, description : string };
type ModelCatalog = { [ix : string] : ModelDescriptor[] };

import { useConfigurationStateStore } from '../state/Configuration';
import { useVersionStateStore } from '../state/Version';

const ConfigureEmbeddings = ({
}) => {

    const version = useVersionStateStore((state) => state.version);

    const embeddingsEngine = useConfigurationStateStore(
        (state) => state.embeddingsEngine
    );

    const embeddingsModel = useConfigurationStateStore(
        (state) => state.embeddingsModel
    );

    const doSetEmbeddingsEngine = useConfigurationStateStore(
        (state) => state.setEmbeddingsEngine
    );

    // Check if version is 1.5.0 or higher
    const isVersion15OrHigher = () => {
        const versionParts = version.version.split('.');
        const majorVersion = parseInt(versionParts[0]) || 0;
        const minorVersion = parseInt(versionParts[1]) || 0;
        return majorVersion > 1 || (majorVersion === 1 && minorVersion >= 5);
    };

    const setEmbeddingsEngine =

        (engine : string) => {

            doSetEmbeddingsEngine(engine);

        };

    const setEmbeddingsModel = useConfigurationStateStore(
        (state) => state.setEmbeddingsModel
    );

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

                {!isVersion15OrHigher() && (
                    <>
                        <Typography variant="h6" component="h3" gutterBottom>
                            Embeddings model
                        </Typography>

                        <FormControl sx={{maxWidth: "50"}}>

                            <InputLabel id="model-name-label">Model</InputLabel>
                        </FormControl>
                    </>
                )}

            </Box>
            
        </Stack>

    </>);
};

export default ConfigureEmbeddings;

