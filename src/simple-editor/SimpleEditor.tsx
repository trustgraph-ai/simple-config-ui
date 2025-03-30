
import React from 'react';

import { Container } from '@mui/material';

import Banner from './Banner.tsx';
import Configuration from './configuration/Configuration.tsx';

import './SimpleEditor.scss';

const SimpleEditor: React.FC = () => {

    return (

        <Container maxWidth="lg" sx={{mt: '1rem'}}>
            <Banner/>
            <Configuration/>
        </Container>

    );

};

export default SimpleEditor;

