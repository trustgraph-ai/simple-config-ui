
import { Typography, Box } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const SystemPrompt = ({
}) => {

    const systemPrompt
        = usePromptsStore((state) => state.system);

    const setSystemPrompt
        = usePromptsStore((state) => state.setSystem);

    return (<>
        <Typography variant="h5" component="h2" gutterBottom>
            System Prompt
        </Typography>

        <Box sx={{ maxWidth: "45rem" }}>

            <Typography variant="body1" component="p" gutterBottom>
                The purpose of the "System" prompt is to present
                a primary prefix to all prompts.
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
                1. Be precise. Be succinct. Be consistent. In general, 
                less is more with LLM prompts. 
            </Typography>

            <Typography variant="body1" component="p" gutterBottom>
                2. Modify the prompt text below. The modified prompt
                will be packaged in the TrustGraph deployment automatically.
            </Typography>

        </Box>

        <Prompt
            value={systemPrompt}
            onChange={
                (v) => setSystemPrompt(v)
            }
        />
    </>);
};

export default SystemPrompt;

