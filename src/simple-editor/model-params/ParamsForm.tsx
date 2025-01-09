import React from 'react';
import { Box, FormControlLabel, Switch, Typography, Paper } from '@mui/material';

import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import Chunker from './Chunker';
import Platform from './Platform';
import ModelDeployment from './ModelDeployment';
import ModelParameters from './ModelParameters';

import { useModelParamsStore } from '../state/ModelParams';
import { useDeploymentStore } from '../state/Deployment';

import modelsRaw from './models.json';
const models = modelsRaw as { [ix: string]: string[] };

interface ParamsFormProps {
}

const ParamsForm: React.FC<ParamsFormProps> = ({
}) => {
    const setConfigUrl =
        useDeploymentStore((state) => state.setConfigUrl);

    useModelParamsStore.subscribe(() => {
        setConfigUrl("");
    });

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

    const platform
        = useModelParamsStore((state) => state.platform);

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

    const setPlatform
        = useModelParamsStore((state) => state.setPlatform);

    // Dual Model Mode State
    const dualModelMode = useModelParamsStore((state) => state.dualModelMode);
    const setDualModelMode = useModelParamsStore((state) => state.setDualModelMode);
    const extractionModelDeployment = useModelParamsStore((state) => state.extractionModelDeployment);
    const setExtractionModelDeployment = useModelParamsStore((state) => state.setExtractionModelDeployment);
    const extractionModelName = useModelParamsStore((state) => state.extractionModelName);
    const setExtractionModelName = useModelParamsStore((state) => state.setExtractionModelName);
    const extractionTemperature = useModelParamsStore((state) => state.extractionTemperature);
    const setExtractionTemperature = useModelParamsStore((state) => state.setExtractionTemperature);
    const extractionMaxOutputTokens = useModelParamsStore((state) => state.extractionMaxOutputTokens);
    const setExtractionMaxOutputTokens = useModelParamsStore((state) => state.setExtractionMaxOutputTokens);

    const ragModelDeployment = useModelParamsStore((state) => state.ragModelDeployment);
    const setRagModelDeployment = useModelParamsStore((state) => state.setRagModelDeployment);
    const ragModelName = useModelParamsStore((state) => state.ragModelName);
    const setRagModelName = useModelParamsStore((state) => state.setRagModelName);
    const ragTemperature = useModelParamsStore((state) => state.ragTemperature);
    const setRagTemperature = useModelParamsStore((state) => state.setRagTemperature);
    const ragMaxOutputTokens = useModelParamsStore((state) => state.ragMaxOutputTokens);
    const setRagMaxOutputTokens = useModelParamsStore((state) => state.setRagMaxOutputTokens);


    // Update the Zustand store when dualModelMode changes
    const handleDualModelModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDualModelMode(event.target.checked);
    };

    // Remove the useEffect and update the state directly in the onChange handlers
    useModelParamsStore.subscribe(
        (n, o) => {

            if (n.modelDeployment == o.modelDeployment) return;

            if (n.modelName in models[n.modelDeployment]) return;

            if (models[n.modelDeployment].length == 0)
                setModelName("");
            else
                setModelName(models[n.modelDeployment][0]);

        }
    );

    return (
        <>
            <Box className="parameters">
                <Box my={2} display="flex" alignItems="center">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={dualModelMode}
                                onChange={handleDualModelModeChange}
                                name="dualModelMode"
                                color="primary"
                            />
                        }
                        label="Dual Model Mode"
                    />
                </Box>

                <Box my={4}>
                    <Platform
                        value={platform} onChange={setPlatform}
                    />
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

                {dualModelMode ? (
                    <>
                        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                            <Typography variant="h6" gutterBottom>Extraction Model Configuration</Typography>
                            <Box my={2}>
                                <ModelDeployment
                                    value={extractionModelDeployment} onChange={setExtractionModelDeployment}
                                />
                            </Box>
                            <Box my={2}>
                                <ModelParameters
                                    modelName={extractionModelName}
                                    temperature={extractionTemperature}
                                    maxOutputTokens={extractionMaxOutputTokens}
                                    onModelNameChange={setExtractionModelName}
                                    onTemperatureChange={setExtractionTemperature}
                                    onMaxOutputTokensChange={setExtractionMaxOutputTokens}
                                    modelDeployment={extractionModelDeployment}
                                />
                            </Box>
                        </Paper>

                        <Paper elevation={3} style={{ padding: '16px' }}>
                            <Typography variant="h6" gutterBottom>RAG Model Configuration</Typography>
                            <Box my={2}>
                                <ModelDeployment
                                    value={ragModelDeployment} onChange={setRagModelDeployment}
                                />
                            </Box>
                            <Box my={2}>
                                <ModelParameters
                                    modelName={ragModelName}
                                    temperature={ragTemperature}
                                    maxOutputTokens={ragMaxOutputTokens}
                                    onModelNameChange={setRagModelName}
                                    onTemperatureChange={setRagTemperature}
                                    onMaxOutputTokensChange={setRagMaxOutputTokens}
                                    modelDeployment={ragModelDeployment}
                                />
                            </Box>
                        </Paper>
                    </>
                ) : (
                    <>
                        <Box my={4}>
                            <ModelDeployment
                                value={modelDeployment} onChange={setModelDeployment}
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
                                modelDeployment={modelDeployment}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default ParamsForm;
