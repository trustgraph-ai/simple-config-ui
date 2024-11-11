
import { Typography, Box, Button, Grid2 as Grid} from '@mui/material';
import { TextField, FormControl, MenuItem, Select } from '@mui/material';
import { InputLabel, Stack, Divider } from '@mui/material';
import { Delete } from '@mui/icons-material';

import Prompt from '../options/Prompt';
import { useAgentsStore } from '../state/Agents';

//import { helpInformation } from './help';

interface ToolEditorProps {
    selected : string;
    deleteTool : () => void;
    setDescription : (description : string) => void;
    setId : (id : string) => void;
    setType : (type : string) => void;
    setName : (name : string) => void;
}

const ToolEditor : React.FC<ToolEditorProps> = ({
    selected, deleteTool, setDescription, setId, setType, setName,
}) => {

    const tools = useAgentsStore((state) => state.tools);

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
                            sx={{minHeight: '10rem'}}
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

                        </Select>
                    </FormControl>
                </Grid>

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

