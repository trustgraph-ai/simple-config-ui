
import { Typography  } from '@mui/material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const RowsPrompt = ({
}) => {

    const rowsPrompt = usePromptsStore((state) => state.rows);
    const setRowsPrompt = usePromptsStore((state) => state.setRows);

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Rows Extraction Prompt
        </Typography>

        <Prompt
            value={rowsPrompt}
            onChange={
                (v) => setRowsPrompt(v)
            }
        />
    </>);
};

export default RowsPrompt;

