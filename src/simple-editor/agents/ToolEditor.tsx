
import React from 'react';

import { Typography, Box, Button, Grid2 as Grid} from '@mui/material';
import { TextField, FormControl, MenuItem, Select } from '@mui/material';
import { InputLabel, Stack, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { useAgentsStore, Tool, Argument } from '../state/Agents';

interface ToolEditorProps {
    selected : string;
    setSelected : (id : string | null) => void;
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
        if (newTools.length > 0)
            setSelected(newTools[0].id);
        else
            setSelected(null);

    };

    const updateTool = (f : (t : Tool) => Tool) => {
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
        updateTool((t) => ({ ...t, name: name }));
    };

    const updateArg = (aix : number, f : (a : Argument) => Argument) => {
        updateTool(
            (t : Tool) => ({
                ...t,
                arguments: tool.arguments.map(
                    (arg : Argument, ix : number) => {
                        if (aix == ix) {
                            return f(arg);
                        } else {
                            return arg;
                        }
                    }
                ),
            })
        );
    };

    const deleteArg = (aix : number) => {
        updateTool(
            (t) => ({
                ...t,
                arguments: tool.arguments.toSpliced(aix, 1)
            })
        );
    };

    const setArgName = (ix : number, name : string) => {
        updateArg(ix, (a) => ({ ...a, name: name }));
    };

    const setArgType = (ix : number, type : string) => {
        updateArg(ix, (a) => ({ ...a, type: type }));
    };

    const setArgDescription = (ix : number, description : string) => {
        updateArg(ix, (a) => ({ ...a, description: description }));
    };

    const addArgument = () => {
        
        const count = tool.arguments.length;
        const newName = "arg-" + (count + 1).toString();

        const args = [
            ...tool.arguments,
            {
                name: newName,
                type: "string",
                description: "Query string for...",
            }
        ];

        updateTool((t) => ({ ...t, arguments: args }));
        
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

            <Grid container spacing={2}>

                <Grid size={12}>
                    <Divider textAlign="left">
                        Tool Definition
                    </Divider>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                        fullWidth
                        label="TrustGraph ID"
                        value={tool.id}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setId(event.target.value);
                            }
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                        fullWidth
                        label="Tool Name"
                        value={tool.name}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setName(event.target.value);
                            }
                        }
                    />
                </Grid>

                <Grid size={12}>
                    <FormControl fullWidth>

                        <InputLabel id="type-label">Tool Options</InputLabel>

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
                                        GraphRAG Query
                                    </Stack>

                                    <Box sx={{
                                    }}>
                                        <Typography variant="body2"
                                            sx={{ whiteSpace: 'wrap' }}
                                        >
                                            Performs a GraphRAG query.
                                            To be effective, the
                                            description should provide clear,
                                            precise information about what
                                            information the GraphRAG query
                                            should return.
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
                                        Text Completion
                                    </Stack>

                                    <Box sx={{
                                    }}>
                                        <Typography variant="body2"
                                            sx={{ whiteSpace: 'wrap' }}
                                        >
                                            Sends a request to
                                            the text completion service to
                                            generate a LLM output without
                                            any additional context. 
                                        </Typography>
                                    </Box>
                                </Stack>
                            </MenuItem>

                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={12}>
                    <TextField
                        fullWidth
                        label="Tool Instructions"
                        multiline
                        value={tool.description}
                        rows={5}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setDescription(event.target.value);
                            }
                        }
                    />
                </Grid>

                {
                    tool.arguments.map(
                        (arg : Argument, ix : number) => (

                            <React.Fragment key={ix}>

                                <Grid size={12}>
                                    <Divider textAlign="left">
                                        {'Tool Argument ' + (ix+1) + ': ' + arg.name}
                                    </Divider>
                                </Grid>

                                <Grid size={4}>
                                    <TextField
                                        fullWidth
                                        label="Argument Name"
                                        value={arg.name}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                setArgName(
                                                    ix,
                                                    event.target.value
                                                );
                                            }
                                        }
                                    />
                                </Grid>

                                <Grid size={6}>

                                    <FormControl fullWidth>

                                        <InputLabel
                                            id={ 'arg-type-' + ix }
                                        >
                                            Argument Type
                                        </InputLabel>

                                        <Select
                                            labelId = { 'arg-type-' + ix }
                                            value={arg.type}
                                            label="Type"
                                            onChange={
                                                (e) =>
                                                    setArgType(
                                                        ix, e.target.value
                                                    )
                                            }
                                        >
                                            <MenuItem value="string">
                                                string
                                            </MenuItem>
                                            <MenuItem value="number">
                                                number
                                            </MenuItem>
                                        </Select>

                                    </FormControl>

                                </Grid>

                                <Grid size={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >

                                    <Box>
                                        <Button
                                            startIcon={<Delete/>}
                                            variant="contained"
                                            onClick={ () => deleteArg(ix) }
                                        >
                                            Delete {arg.name}
                                        </Button>
                                    </Box>

                                </Grid>


                                <Grid size={12}>

                                    <TextField
                                        fullWidth
                                        label="Argument Definition"
                                        value={arg.description}
                                        multiline
                                        rows={2}
                                        onChange={
                                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                                setArgDescription(
                                                    ix,
                                                    event.target.value
                                                );
                                            }
                                        }
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
                        onClick={ addArgument }
                    >
                        Add Tool Argument
                    </Button>
                }

            </Box>

            <Box>

                {
                    <Button
                        startIcon={<Delete/>}
                        variant="contained"
                        onClick={ deleteTool }
                    >
                        Delete {tool.name}
                    </Button>
                }

            </Box>

        </>
    );

}

export default ToolEditor;

