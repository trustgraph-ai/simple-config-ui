
import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { generateConfig } from './generate-config';

import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import Chunker from './Chunker';
import ModelDeployment from './ModelDeployment';
import ModelParameters from './ModelParameters';

interface ParamsFormProps {
    setDeploymentConfig : (c : string) => void;
}

const ParamsForm: React.FC<ParamsFormProps> = ({
    setDeploymentConfig
}) => {

  const [graphStore, setGraphStore] = useState('cassandra');
  const [vectorDB, setVectorDB] = useState('qdrant');
  const [chunkerType, setChunkerType] = useState('chunker-recursive');
  const [chunkSize, setChunkSize] = useState(1000);
  const [chunkOverlap, setChunkOverlap] = useState(200);
  const [modelDeployment, setModelDeployment] = useState('openai');
  const [modelName, setModelName] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxOutputTokens, setMaxOutputTokens] = useState(1000);

  const deploy = () => {

      generateConfig(
          graphStore, modelDeployment, vectorDB, chunkSize, chunkOverlap,
          maxOutputTokens, modelName, chunkerType, temperature,
      ).then((x) => setDeploymentConfig(x));

  }

  return (

      <>

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

      </>

  );
};

export default ParamsForm;

