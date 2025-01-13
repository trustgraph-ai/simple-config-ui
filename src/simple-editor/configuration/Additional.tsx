
import { Typography, Box } from '@mui/material';

import Options from '../options/Options';

const Additional = ({
}) => {

    return (<>

        <Box sx={{ mb: 2}}>
        <Typography variant="h5" component="h2" gutterBottom>
            Optional Customization
        </Typography>

        <Typography variant="body2" gutterBottom>
            Below are selectable customizations for your specific use
            cases. If selected, a new tab will open with all available 
            customization options. If no options are selected, TrustGraph
            will deploy with the system defaults.
        </Typography>

        <Typography variant="body2">
            Note: Selecting the Data Workbench requires no additional configuration.
        </Typography>

        </Box>

        <Options/>

    </>);
};

export default Additional;

