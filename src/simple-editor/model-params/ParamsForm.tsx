import React from 'react';
import { Box, FormControlLabel, Switch, Typography, Paper } from '@mui/material';

import VersionSelection from './VersionSelection';
import GraphStore from './GraphStore';
import VectorDB from './VectorDB';
import ObjectStore from './ObjectStore';
import Chunker from './Chunker';
import Platform from './Platform';
import ModelDeployment from './ModelDeployment';

import { useConfigurationStateStore } from '../state/Configuration';
import { useDeploymentStore } from '../state/Deployment';
import { useVersionStateStore } from '../state/Version';

type ModelDescriptor = { id : string, description : string };
type ModelCatalog = { [ix : string] : ModelDescriptor[] };

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

    const objectStore
        = useConfigurationStateStore((state) => state.objectStore);

    const chunkerType
        = useConfigurationStateStore((state) => state.chunkerType);

    const chunkSize
        = useConfigurationStateStore((state) => state.chunkSize);

    const chunkOverlap
        = useConfigurationStateStore((state) => state.chunkOverlap);

    const platform
        = useConfigurationStateStore((state) => state.platform);

    const setGraphStore
        = useConfigurationStateStore((state) => state.setGraphStore);

    const setVectorDB
        = useConfigurationStateStore((state) => state.setVectorDB);

    const setObjectStore
        = useConfigurationStateStore((state) => state.setObjectStore);

    const setChunkerType
        = useConfigurationStateStore((state) => state.setChunkerType);

    const setChunkSize
        = useConfigurationStateStore((state) => state.setChunkSize);

    const setChunkOverlap
        = useConfigurationStateStore((state) => state.setChunkOverlap);

    const setPlatform
        = useConfigurationStateStore((state) => state.setPlatform);

    const version
        = useVersionStateStore((state) => state.version);

    // Parse version number to check if >= 1.4.0
    const versionParts = version.version.split('.');
    const majorVersion = parseInt(versionParts[0]) || 0;
    const minorVersion = parseInt(versionParts[1]) || 0;
    const isVersion14OrHigher = majorVersion > 1 || (majorVersion === 1 && minorVersion >= 4);

    // Dual Model Mode State
    const dualModelMode = useConfigurationStateStore(
        (state) => state.dualModelMode
    );

    const setDualModelMode = useConfigurationStateStore(
        (state) => state.setDualModelMode
    );

    const mainModel = useConfigurationStateStore((state) => state.mainModel);
    const setMainModel = useConfigurationStateStore(
        (state) => state.setMainModel
    );

    const setMainModelDeployment = (deployment : string) => {
        setMainModel({
            ...mainModel,
            deployment: deployment,
        })
    };

    const ragModel = useConfigurationStateStore((state) => state.ragModel);
    const setRagModel = useConfigurationStateStore(
        (state) => state.setRagModel
    );

    const setRagModelDeployment = (deployment : string) => {
        setRagModel({
            ...ragModel,
            deployment: deployment
        })
    };

    // Update the Zustand store when dualModelMode changes
    const handleDualModelModeChange =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setDualModelMode(event.target.checked);
        };

    return (
        <>
            <Box className="parameters">

                <Box my={4}>
                    <VersionSelection/>
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

                {(() => {
                    // Parse version number from string like "1.3.0" or "1.2.1"
                    const versionParts = version.version.split('.');
                    const majorVersion = parseInt(versionParts[0]) || 0;
                    const minorVersion = parseInt(versionParts[1]) || 0;
                    const isVersion13OrHigher = majorVersion > 1 || (majorVersion === 1 && minorVersion >= 3);

                    // Show the selector if version is 1.3 or higher, otherwise don't render it
                    if (isVersion13OrHigher) {
                        return (
                            <Box my={4}>
                                <ObjectStore
                                    value={objectStore}
                                    onChange={setObjectStore}
                                />
                            </Box>
                        );
                    }
                    return null;
                })()}

                {!isVersion14OrHigher && (
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
                )}

                {!isVersion14OrHigher && (
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
                )}

                <Paper
                    elevation={3}
                    style={{
                        padding: '16px',
                        marginBottom: '16px'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        {dualModelMode ? 'Extraction ' : ''}
                        Model Configuration
                    </Typography>
                    <Box my={2}>
                        <ModelDeployment
                            value={mainModel.deployment}
                            onChange={setMainModelDeployment}
                        />
                    </Box>
                </Paper>

                {
                    !isVersion14OrHigher && dualModelMode &&
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h6" gutterBottom>
                            RAG Model Configuration
                        </Typography>
                        <Box my={2}>
                            <ModelDeployment
                                value={ragModel.deployment}
                                onChange={setRagModelDeployment}
                            />
                        </Box>
                    </Paper>
                }
            </Box>
        </>
    );
};

export default ParamsForm;
