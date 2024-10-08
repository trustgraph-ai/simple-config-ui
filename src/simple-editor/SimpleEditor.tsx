
import React from 'react';

import { Typography, Box } from '@mui/material';

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

            </Box>

      </Box>

    );

};

export default SimpleEditor;

