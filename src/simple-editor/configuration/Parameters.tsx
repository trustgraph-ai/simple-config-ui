
import { Typography } from '@mui/material';

import ParamsForm from '../model-params/ParamsForm';

const Parameters = ({
}) => {

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
          Model parameters
        </Typography>

        <ParamsForm/>

    </>);
};

export default Parameters;

