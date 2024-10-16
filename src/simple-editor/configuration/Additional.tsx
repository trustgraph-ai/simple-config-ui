
import { Typography, Box } from '@mui/material';

import Options from '../options/Options';

const Additional = ({
}) => {

    return (<>

        <Box sx={{ mb: 2}}>
        <Typography variant="h5" component="h2" gutterBottom>
            Additional configuration
        </Typography>

        <Typography variant="body2">
            Listed here are additional configuraton options and
            add-ons, all optional.  Click on additional
            configuration options to include in the configuration,
            further configuration options may appear on separate
            configuration tabs.
        </Typography>
        </Box>

        <Options/>

    </>);
};

export default Additional;

