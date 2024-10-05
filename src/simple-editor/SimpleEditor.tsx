
import React from 'react';

import { Typography, Box } from '@mui/material';

import ParamsForm from './ParamsForm';
import Deployment from './Deployment';

import './SimpleEditor.scss'

const App: React.FC = () => {

    return (

        <Box className="editor">

            <Typography variant="h4" component="h1" gutterBottom>
              Configuration Editor
            </Typography>

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

