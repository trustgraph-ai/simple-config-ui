
import './SimpleEditor.scss'

import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';

import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import Chunker from './Chunker';
import ModelDeployment from './ModelDeployment';
import ModelParameters from './ModelParameters';

const App: React.FC = () => {

  const [graphStore, setGraphStore] = useState('cassandra');
  const [vectorDB, setVectorDB] = useState('qdrant');
  const [chunkerType, setChunkerType] = useState('chunker-recursive');
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [modelDeployment, setModelDeployment] = useState('openai');
  const [modelName, setModelName] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxOutputTokens, setMaxOutputTokens] = useState(1000);
  const [deploymentConfig, setDeploymentConfig] = useState("");

  const deploy = () => {
  console.log(chunkerType);
      let config =
        [
            {
                "name": "pulsar",
                "parameters": {}
            },
            {
                "name": "trustgraph-base",
                "parameters": {}
            },
            {
                "name": "graph-rag-" + graphStore,
                "parameters": {}
            },
            {
                "name": modelDeployment,
                "parameters": {}
            },
            {
                "name": "grafana",
                "parameters": {}
            },
            {
                "name": "vector-store-" + vectorDB,
                "parameters": {}
            }
        ];

        if (chunkerType == "chunker-recursive") {
            config.push({
                "name": "override-recursive-chunker",
                "parameters": {
                    "chunk-size": chunkSize,
                    "chunk-overlap": chunkOverlap,
                }
            });
        } else {
            config.push({
                "name": "null",
                "parameters": {
                    "chunk-size": chunkSize,
                    "chunk-overlap": chunkOverlap,
                }
            });
        }

        config.push({
            name: "null",
            parameters: {
                [modelDeployment + "-temperature"]: temperature,
                [modelDeployment + "-max-output-tokens"]: maxOutputTokens,
                [modelDeployment + "-model"]: modelName,
            }
        });

        const cnf = JSON.stringify(config, null, 4)
      
        fetch(
            "/api/generate", {
                body: cnf,
                method: "POST",
                headers: {
                }
             }
        ).then(
            x => x.text()
        ).then(
            x => setDeploymentConfig(x)
        );

  };

  return (

    <Container maxWidth="sm">

      <Typography variant="h4" component="h1" gutterBottom>
        Configuration Editor
      </Typography>

      <Box my={4}>
        <GraphStore value={graphStore} onChange={setGraphStore} />
      </Box>

      <Box my={4}>
        <VectorDB value={vectorDB} onChange={setVectorDB} />
      </Box>

      <Box my={4}>
        <Chunker
          type={chunkerType}
          chunkSize={chunkSize}
          chunkOverlap={chunkOverlap}
          onTypeChange={setChunkerType}
          onChunkSizeChange={setChunkSize}
          onChunkOverlapChange={setChunkOverlap}
        />
      </Box>

      <Box my={4}>
        <ModelDeployment value={modelDeployment} onChange={setModelDeployment} />
      </Box>

      <Box my={4}>
        <ModelParameters
          modelName={modelName}
          temperature={temperature}
          maxOutputTokens={maxOutputTokens}
          onModelNameChange={setModelName}
          onTemperatureChange={setTemperature}
          onMaxOutputTokensChange={setMaxOutputTokens}
        />
      </Box>

      <Box my={4}>
      <Button variant="contained" onClick={() => deploy()}>Generate</Button>
      </Box>

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

