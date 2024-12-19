
import React from 'react';

import { Typography, Box, Paper, Stack } from '@mui/material';
import { Gavel } from '@mui/icons-material';

import { useModelParamsStore } from '../state/ModelParams';

import DeploymentQuote from './DeploymentQuote';

const GraphStoreConfiguration = () => {

    return <>

        <Typography variant="body2" sx={{ mt: 2 }}>
            FalkorDB is licensed under
            the <a href="https://github.com/FalkorDB/FalkorDB/blob/master/LICENSE.txt">
                Server Side Public License (SSPLv1)
            </a>.
        </Typography>

        <DeploymentQuote>
            "The Server Side Public License (SSPLv1) is designed to
            ensure that if you use FalkorDB as part of a service you
            make available to others (e.g., in the cloud or as an
            API), you are required to make the source code of your
            complete service available under the SSPLv1 license. This
            is similar to GPL but extends to server use."
        </DeploymentQuote>

    </>;

}

const DeploymentModelGraph: React.FC<{}> = ({
}) => {

    const graphStore = useModelParamsStore((state) => state.graphStore);

    if (graphStore != "falkordb") return null;

    return <>

        <Box>
            <Paper sx={{ minWidth: 375, mt: 2, p: 2 }} elevation={3}>
                <Stack
                    direction="row" spacing={2}
                    alignItems="center"
                >
                    <Gavel color="primary" fontSize="large"/>
                    <Typography variant="h6" component="h3">
                        <Box>Graph Store</Box>
                    </Typography>
                </Stack>
                <GraphStoreConfiguration/>
            </Paper>
        </Box>

    </>;

};

export default DeploymentModelGraph;

