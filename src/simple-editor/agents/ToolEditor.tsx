
import React from 'react';

import { Typography, Box, Button, Grid2 as Grid} from '@mui/material';
import { TextField, FormControl, MenuItem, Select } from '@mui/material';
import { InputLabel, Stack, Divider, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';

import Prompt from '../options/Prompt';
import { useAgentsStore } from '../state/Agents';

//import { helpInformation } from './help';

interface ToolEditorProps {
    selected : string;
    setSelected : (id : string) => void;
}

const ToolEditor : React.FC<ToolEditorProps> = ({
    selected, setSelected,
}) => {

    const tools = useAgentsStore((state) => state.tools);

    const setTools
        = useAgentsStore((state) => state.setTools);

    const deleteTool = () => {
        const newTools = tools.filter(p => (p.id != selected));
        setTools(newTools);
        setSelected(newTools[0].id);

    };

    const updateTool = (f) => {
        const newTools = tools.map(
            e => {
                if (e.id == selected) {
                    return f(e);
                } else {
                    return e;
                }
            }
        );
        setTools(newTools);
    };

    const setDescription = (desc : string) => {
        updateTool((t) => ({ ...t, description: desc }));
    };

    const setId = (id : string) => {
        updateTool((t) => ({ ...t, id: id }));
        setSelected(id);
    };

    const setType = (type : string) => {
        updateTool((t) => ({ ...t, type: type }));
    };

    const setName = (name : string) => {
        updateName((t) => ({ ...t, name: name }));
    };

    let tool : any = null;
    for (let p of tools) {
       if (p.id == selected) tool = p;
    }

    return (

        <>
            <Typography
                variant="h5" component="h2" gutterBottom
            >
                { tool.name }
            </Typography>

            <Grid container spacing={1}>

                <Grid size={12}>
                    <Divider textAlign="left">
                        tool description
                    </Divider>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label="ID"
                        value={tool.id}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setId(event.target.value);
                            }
                        }
                        margin="normal"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={tool.name}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }
                        }
                        margin="normal"
                    />
                </Grid>

                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        value={tool.description}
                        rows={5}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setDescription(event.target.value);
                            }
                        }
                        margin="normal"
                    />
                </Grid>

                <Grid size={12}>
                    <FormControl fullWidth>

                        <InputLabel id="type-label">Type</InputLabel>

                        <Select
                            labelId="type-label"
                            id="type-select"
                            value={tool.type}
                            label="Tool type"
                            onChange={(e) => setType(e.target.value)}
                            sx={{minHeight: '6rem'}}
                        >

                            <MenuItem value="knowledge-query">
                                <Stack
                                    direction="row" spacing={2}
                                    divider={
                                        <Divider orientation="vertical" flexItem/>
                                    }
                                >

                                    <Stack
                                        sx={{width: '18rem' }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        textAlign="center"
                                    >
                                        Knowledge<br/>query
                                    </Stack>

                                    <Box sx={{
                                    }}>
                                        <Typography variant="body2"
                                            sx={{ whiteSpace: 'wrap' }}
                                        >
                                            This tool performs a Graph RAG
                                            query using a question which is
                                            automatically created based on
                                            what the agent wants to extract
                                            next.  To be effective, the
                                            description should provide clear,
                                            precise information about what
                                            can be obtained using this
                                            a Graph RAG query on this dataset.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </MenuItem>

                            <MenuItem value="text-completion">
                                <Stack
                                    direction="row" spacing={2}
                                    divider={
                                        <Divider orientation="vertical" flexItem/>
                                    }
                                >

                                    <Stack
                                        sx={{width: '18rem' }}
                                        direction="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        textAlign="center"
                                    >
                                        Text<br/>completion
                                    </Stack>

                                    <Box sx={{
                                    }}>
                                        <Typography variant="body2"
                                            sx={{ whiteSpace: 'wrap' }}
                                        >
                                            This tool sends a query to
                                            the text completion service,
                                            providing basic LLM output.
                                            This only works with knowledge
                                            or information which can be
                                            handled within the LLM without
                                            using any external knowledge.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </MenuItem>

                        </Select>
                    </FormControl>
                </Grid>

                {
                    Array.from(tool.arguments.entries()).map(
                        ([ix, arg]) => (

                            <React.Fragment key={ix}>

                                <Grid size={12}>
                                    <Divider textAlign="left">
                                        {'argument: ' + arg.name}
                                    </Divider>
                                </Grid>

                                <Grid size={4}>

                                    <TextField
                                        fullWidth
                                        label="Name"
                                        value={arg.name}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                setName(event.target.value);
                                            }
                                        }
                                        margin="normal"
                                    />
                                </Grid>

                                <Grid size={6}>

                                    <TextField
                                        fullWidth
                                        label="Type"
                                        value={arg.type}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                setType(event.target.value);
                                            }
                                        }
                                        margin="normal"
                                    />

                                </Grid>

                                <Grid size={2}>

                                    <Box>

                                        {
                                            <Button
                                                startIcon={<Delete/>}
                                                variant="contained"
                                                onClick={ deleteTool }
                                            >
                                                Delete
                                            </Button>
                                        }

                                    </Box>

                                </Grid>


                                <Grid size={12}>

                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={arg.description}
                                        multiline
                                        rows={2}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                setType(event.target.value);
                                            }
                                        }
                                        margin="normal"
                                    />

                                </Grid>

                            </React.Fragment>
                        )
                    )
                }

            </Grid>

            <Box>

                {
                    <Button
                        startIcon={<Delete/>}
                        variant="contained"
                        onClick={ deleteTool }
                    >
                        Delete this tool
                    </Button>
                }

            </Box>

        </>
    );

}

export default ToolEditor;

