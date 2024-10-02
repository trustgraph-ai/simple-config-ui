
import React, { useState } from 'react';

import { ContentPaste } from '@mui/icons-material';
import {
    Button, Container, Typography, Box, TextField, Stack
} from '@mui/material';

import ParamsForm from './ParamsForm';
import './SimpleEditor.scss'

const App: React.FC = () => {

    const [deploymentConfig, setDeploymentConfig] = useState("");

    const copyToClipboard = () => {
        if (deploymentConfig) {
            navigator.clipboard.writeText(deploymentConfig);
        }
    }

  return (

    <Container maxWidth="lg">

      <Stack direction="row" spacing={5}>

      <Box>

          <Typography variant="h4" component="h1" gutterBottom>
            Configuration Editor
          </Typography>

          <ParamsForm setDeploymentConfig={setDeploymentConfig}/>

      </Box>

      <Box>
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
                <Button onClick={copyToClipboard} variant="outlined"
                    startIcon={<ContentPaste/>}
                >
                    Copy to clipboard
                </Button>

      </Box>

      </Stack>

    </Container>

  );
};

export default App;

