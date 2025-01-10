import React from 'react';
import { Box, FormControlLabel, Switch, Typography, Paper } from '@mui/material';

import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import Chunker from './Chunker';
import Platform from './Platform';
import ModelDeployment from './ModelDeployment';
import ModelParameters from './ModelParameters';

import { useConfigurationStateStore } from '../state/Configuration';
import { useDeploymentStore } from '../state/Deployment';

import modelsRaw from './models.json';
const models = modelsRaw as { [ix: string]: string[] };

interface ParamsFormProps {
}

const ParamsForm: React.FC<ParamsFormProps> = ({
}) => {
    const setConfigUrl =
        useDeploymentStore((state) => state.setConfigUrl);

    useConfigurationStateStore.subscribe(() => {
        setConfigUrl("");
    });

    const graphStore
        = useConfigurationStateStore((state) => state.graphStore);

    const vectorDB
        = useConfigurationStateStore((state) => state.vectorDB);

    const chunkerType
        = useConfigurationStateStore((state) => state.chunkerType);

    const chunkSize
        = useConfigurationStateStore((state) => state.chunkSize);

    const chunkOverlap
        = useConfigurationStateStore((state) => state.chunkOverlap);

    const modelDeployment
        = useConfigurationStateStore((state) => state.modelDeployment);

    const modelName
        = useConfigurationStateStore((state) => state.modelName);

    const temperature
        = useConfigurationStateStore((state) => state.temperature);

    const platform
        = useConfigurationStateStore((state) => state.platform);

    const maxOutputTokens
        = useConfigurationStateStore((state) => state.maxOutputTokens);

    const setGraphStore
        = useConfigurationStateStore((state) => state.setGraphStore);

    const setVectorDB
        = useConfigurationStateStore((state) => state.setVectorDB);

    const setChunkerType
        = useConfigurationStateStore((state) => state.setChunkerType);

    const setChunkSize
        = useConfigurationStateStore((state) => state.setChunkSize);

    const setChunkOverlap
        = useConfigurationStateStore((state) => state.setChunkOverlap);

    const setModelDeployment
        = useConfigurationStateStore((state) => state.setModelDeployment);

    const setModelName
        = useConfigurationStateStore((state) => state.setModelName);

    const setTemperature
        = useConfigurationStateStore((state) => state.setTemperature);

    const setMaxOutputTokens
        = useConfigurationStateStore((state) => state.setMaxOutputTokens);

    const setPlatform
        = useConfigurationStateStore((state) => state.setPlatform);

    // Dual Model Mode State
    const dualModelMode = useConfigurationStateStore((state) => state.dualModelMode);
    const setDualModelMode = useConfigurationStateStore((state) => state.setDualModelMode);
    const extractionModelDeployment = useConfigurationStateStore((state) => state.extractionModelDeployment);
    const setExtractionModelDeployment = useConfigurationStateStore((state) => state.setExtractionModelDeployment);
    const extractionModelName = useConfigurationStateStore((state) => state.extractionModelName);
    const setExtractionModelName = useConfigurationStateStore((state) => state.setExtractionModelName);
    const extractionTemperature = useConfigurationStateStore((state) => state.extractionTemperature);
    const setExtractionTemperature = useConfigurationStateStore((state) => state.setExtractionTemperature);
    const extractionMaxOutputTokens = useConfigurationStateStore((state) => state.extractionMaxOutputTokens);
    const setExtractionMaxOutputTokens = useConfigurationStateStore((state) => state.setExtractionMaxOutputTokens);

    const ragModelDeployment = useConfigurationStateStore((state) => state.ragModelDeployment);
    const setRagModelDeployment = useConfigurationStateStore((state) => state.setRagModelDeployment);
    const ragModelName = useConfigurationStateStore((state) => state.ragModelName);
    const setRagModelName = useConfigurationStateStore((state) => state.setRagModelName);
    const ragTemperature = useConfigurationStateStore((state) => state.ragTemperature);
    const setRagTemperature = useConfigurationStateStore((state) => state.setRagTemperature);
    const ragMaxOutputTokens = useConfigurationStateStore((state) => state.ragMaxOutputTokens);
    const setRagMaxOutputTokens = useConfigurationStateStore((state) => state.setRagMaxOutputTokens);


    // Update the Zustand store when dualModelMode changes
    const handleDualModelModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDualModelMode(event.target.checked);
    };

    // Remove the useEffect and update the state directly in the onChange handlers
    useConfigurationStateStore.subscribe(
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
