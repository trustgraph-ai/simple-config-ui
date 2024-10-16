
import { Typography, Box } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const TopicsPrompt = ({
}) => {

    const topicsPrompt
        = usePromptsStore((state) => state.topics);

    const setTopicsPrompt
        = usePromptsStore((state) => state.setTopics);

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Topics Prompt
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
                { '{\n'}
                { '   "topic": string,\n' }
                { '   "definition": string\n' }
                { '}'}
            </pre>

        </Box>

        <Prompt
            value={topicsPrompt}
            onChange={
                (v) => setTopicsPrompt(v)
            }
        />
    </>);
};

export default TopicsPrompt;

