
import React from 'react';

import { Typography, Box, Stack } from '@mui/material';

import AgentControls from './AgentControls';
import ToolEditor from './ToolEditor';
import { useAgentsStore } from '../state/Agents';

const ConfigureAgents = ({
}) => {

    const tools = useAgentsStore((state) => state.tools);

    const setTools
        = useAgentsStore((state) => state.setTools);

    const [selected, setSelected] = React.useState(tools[0].id);

    const handleSelect = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
        setSelected(id);
    };

    const addTool = () => {

        const count = tools.length;
        const newId = "custom-tool-" + (count + 1).toString();

        const newTool = {
            id: newId,
            name: "Example knowledge",
            description: "Query a knowledge store for...",
            type: "knowledge-query",
            arguments: [
                {
                    name: "query",
                    type: "string",
                    description: "The search query string",
                }                
            ]
        };

        setTools([...tools, newTool]);
        setSelected(newId);
        
    };

    const deleteTool = () => {

        const newTools = tools.filter(p => (p.id != selected));

        setTools(newTools);
        setSelected(newTools[0].id);

    };

    const setDescription = (newVal : string) => {
        const newTools = tools.map(
            p => {
                if (p.id == selected) {
                    const newP = {
                        ...p,
                        description: newVal,
                    };
                    return newP;
                } else {
                    return p;
                }
            }
        );
        setTools(newTools);
    };

    const setId = (newVal : string) => {
        const newTools = tools.map(
            p => {
                if (p.id == selected) {
                    const newP = {
                        ...p,
                        id: newVal,
                    };
                    return newP;
                } else {
                    return p;
                }
            }
        );
        setTools(newTools);

        // Have to change ID to point to the new changed ID
        setSelected(newVal);
    };

    const setType = (newVal : string) => {
        const newTools = tools.map(
            p => {
                if (p.id == selected) {
                    const newP = {
                        ...p,
                        type: newVal,
                    };
                    return newP;
                } else {
                    return p;
                }
            }
        );
        setTools(newTools);
    };

    const setName = (newVal : string) => {
        const newTools = tools.map(
            p => {
                if (p.id == selected) {
                    const newP = {
                        ...p,
                        name: newVal,
                    };
                    return newP;
                } else {
                    return p;
                }
            }
        );
        setTools(newTools);
    };

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Agents
                </Typography>

                <AgentControls
                    selected={selected}
                    handleSelect={handleSelect}
                    addTool={addTool}
                />

            </Box>

            <Stack
                direction="column" spacing={2}
            >

                <ToolEditor
                    selected={selected}
                    deleteTool={deleteTool}
                    setDescription={setDescription}
                    setId={setId}
                    setType={setType}
                    setName={setName}
                />

            </Stack>
            
        </Stack>

    </>);
};

export default ConfigureAgents;

