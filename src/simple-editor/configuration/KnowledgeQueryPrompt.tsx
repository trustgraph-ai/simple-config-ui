
import { Typography } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const KnowledgeQueryPrompt = ({
}) => {

    const knowledgeQueryPrompt
        = usePromptsStore((state) => state.knowledgeQuery);

    const setKnowledgeQueryPrompt
        = usePromptsStore((state) => state.setKnowledgeQuery);

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Knowledge Graph Query Prompt
        </Typography>

        <Prompt
            value={knowledgeQueryPrompt}
            onChange={
                (v) => setKnowledgeQueryPrompt(v)
            }
        />
    </>);
};

export default KnowledgeQueryPrompt;

