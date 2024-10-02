
import './SimpleEditor.scss'

import React, { useState } from 'react';
import { Container, Typography, Box, TextField } from '@mui/material';
import ParamsForm from './ParamsForm';

const App: React.FC = () => {

  const [deploymentConfig, setDeploymentConfig] = useState("");

  return (

    <Container maxWidth="sm">

      <Typography variant="h4" component="h1" gutterBottom>
        Configuration Editor
      </Typography>

      <ParamsForm setDeploymentConfig={setDeploymentConfig}/>

      <Box my={4}>
      <TextField
          id="deployment-config-text"
          minRows={30} maxRows={40}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          defaultValue={deploymentConfig}
          multiline
        />
        </Box>

    </Container>

  );
};

export default App;

