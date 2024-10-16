
import { Typography, Box } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const DefinitionsPrompt = ({
}) => {

    const definitionsPrompt
        = usePromptsStore((state) => state.definitions);

    const setDefinitionsPrompt
        = usePromptsStore((state) => state.setDefinitions);

    return (<>
        <Typography variant="h5" component="h2" gutterBottom>
            Definitions Prompt
        </Typography>

        <Box sx={{ maxWidth: "45rem" }}>

            <Typography variant="body1" component="p" gutterBottom>
                The chunked text from the ingested documents is placed 
                in the prompt as the variable <code>text</code>.
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
                Note: The LLM response from this prompt must have the
                following JSON structure to form correct RDF triples:
            </Typography>

            <pre>
                "entity": string,<br/>
                "definitions": string
            </pre>

        </Box>

        <Prompt
            value={definitionsPrompt}
            onChange={
                (v) => setDefinitionsPrompt(v)
            }
        />
    </>);
};

export default DefinitionsPrompt;

