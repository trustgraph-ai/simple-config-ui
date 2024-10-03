
import React from 'react';

import { Box } from '@mui/material';

import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import Chunker from './Chunker';
import ModelDeployment from './ModelDeployment';
import ModelParameters from './ModelParameters';

import { useModelParamsStore } from './state/ModelParams';

interface ParamsFormProps {
}

const ParamsForm: React.FC<ParamsFormProps> = ({
}) => {

    const graphStore
        = useModelParamsStore((state) => state.graphStore);

    const vectorDB
        = useModelParamsStore((state) => state.vectorDB);

    const chunkerType
        = useModelParamsStore((state) => state.chunkerType);

    const chunkSize
        = useModelParamsStore((state) => state.chunkSize);

    const chunkOverlap
        = useModelParamsStore((state) => state.chunkOverlap);

    const modelDeployment
        = useModelParamsStore((state) => state.modelDeployment);

    const modelName
        = useModelParamsStore((state) => state.modelName);

    const temperature
        = useModelParamsStore((state) => state.temperature);

    const maxOutputTokens
        = useModelParamsStore((state) => state.maxOutputTokens);

    const setGraphStore
        = useModelParamsStore((state) => state.setGraphStore);

    const setVectorDB
        = useModelParamsStore((state) => state.setVectorDB);

    const setChunkerType
        = useModelParamsStore((state) => state.setChunkerType);

    const setChunkSize
        = useModelParamsStore((state) => state.setChunkSize);

    const setChunkOverlap
        = useModelParamsStore((state) => state.setChunkOverlap);

    const setModelDeployment
        = useModelParamsStore((state) => state.setModelDeployment);

    const setModelName
        = useModelParamsStore((state) => state.setModelName);

    const setTemperature
        = useModelParamsStore((state) => state.setTemperature);

    const setMaxOutputTokens
        = useModelParamsStore((state) => state.setMaxOutputTokens);


    return (

        <>

            <Box my={4}>
              <ModelDeployment value={modelDeployment} onChange={setModelDeployment} />
            </Box>

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
              <ModelParameters
                modelName={modelName}
                temperature={temperature}
                maxOutputTokens={maxOutputTokens}
                onModelNameChange={setModelName}
                onTemperatureChange={setTemperature}
                onMaxOutputTokensChange={setMaxOutputTokens}
              />
            </Box>

        </>

  );
};

export default ParamsForm;

