
import { Typography, Box } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const RelationshipsPrompt = ({
}) => {

    const relationshipsPrompt
        = usePromptsStore((state) => state.relationships);

    const setRelationshipsPrompt
        = usePromptsStore((state) => state.setRelationships);

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Relationships Prompt
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
                "subject": string,<br/>
                "predicate": string,<br/>
                "object": string,<br/>
                "entity-object": boolean
            </pre>

        </Box>

        <Prompt
            value={relationshipsPrompt}
            onChange={
                (v) => setRelationshipsPrompt(v)
            }
        />
    </>);
};

export default RelationshipsPrompt;

