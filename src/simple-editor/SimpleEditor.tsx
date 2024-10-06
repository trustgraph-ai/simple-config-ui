
import React from 'react';

import { Typography, Box, Stack } from '@mui/material';

import ParamsForm from './ParamsForm';
import Deployment from './Deployment';

import './SimpleEditor.scss'

const App: React.FC = () => {

    return (

        <Box className="editor">

            <Stack
                alignItems="center"
                direction="row"
                gap={2}
                sx={{ mb: 3 }}
            >
                    <Box>
                        <img src="/tg.svg" alt="Trustgraph logo"
                            height="45"/>
                    </Box>
                    <Typography variant="h4" component="h1">
                        TrustGraph configuration creator
                    </Typography>
            </Stack>

            <Box className="layout">

                <Box className="params">

                    <Typography variant="h5" component="h2" gutterBottom>
                      Model parameters
                    </Typography>

                    <ParamsForm/>

                </Box>

                <Box className="deployment">

                    <Typography variant="h5" component="h2" gutterBottom>
                      Deployment process
                    </Typography>

                    <Deployment/>

                </Box>

            </Box>

      </Box>

    );

};

export default App;

