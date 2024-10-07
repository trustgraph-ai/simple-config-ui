
import React from 'react';

import { Typography, Box } from '@mui/material';

import Deployment from './Deployment';
import Banner from './Banner.tsx';
import Configuration from './Configuration.tsx';

import './SimpleEditor.scss';

const SimpleEditor: React.FC = () => {

    return (

        <Box className="editor">

            <Banner/>

            <Box className="layout">

                <Box className="params">

                    <Configuration/>

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

export default SimpleEditor;

