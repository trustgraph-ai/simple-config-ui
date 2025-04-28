
import { Typography } from '@mui/material';

import ParamsForm from '../model-params/ParamsForm';

const Parameters = ({
}) => {

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
          TrustGraph Component Options
        </Typography>

        <Typography variant="body1" component="p" gutterBottom>
            For each category, select one option from the list of
            available components.
        </Typography>

        <ParamsForm/>

    </>);
};

export default Parameters;

