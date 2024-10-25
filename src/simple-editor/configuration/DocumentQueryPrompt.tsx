
import { Typography } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const DocumentQueryPrompt = ({
}) => {

    const documentQueryPrompt
        = usePromptsStore((state) => state.documentQuery);

    const setDocumentQueryPrompt
        = usePromptsStore((state) => state.setDocumentQuery);

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Document Graph Query Prompt
        </Typography>

        <Prompt
            value={documentQueryPrompt}
            onChange={
                (v) => setDocumentQueryPrompt(v)
            }
        />
    </>);
};

export default DocumentQueryPrompt;

