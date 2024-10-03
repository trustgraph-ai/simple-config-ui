
import React from 'react';

import { Typography, Box } from '@mui/material';

import ParamsForm from './ParamsForm';
import Deployment from './Deployment';

import './SimpleEditor.scss'
/*

import { generateConfig } from './generate-config';

import {
    graphStore, vectorDB, chunkerType, chunkSize, chunkOverlap,
    modelDeployment, modelName, temperature, maxOutputTokens,
} from './state/ModelParams';
*/

const App: React.FC = () => {

/*
    const generate = () => {

        generateConfig(
            graphStore, modelDeployment, vectorDB, chunkSize, chunkOverlap,
            maxOutputTokens, modelName, chunkerType, temperature,
        ).then(
            (_x) => {
            }
        ).catch(
            (err) => {
                console.log("Could not generate config: " + err.toString());
            }
        );

    }
*/
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

