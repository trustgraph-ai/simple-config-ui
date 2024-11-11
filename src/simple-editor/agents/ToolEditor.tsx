
import { Typography, Box, Button } from '@mui/material';
import { TextField } from '@mui/material';
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

            {/*
                (helpInformation[selected]) &&
                <Box>
                    { helpInformation[selected] }
                </Box>
                */
            }

                    <Box>
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

                        <TextField
                          fullWidth
                          label="Type"
                          value={tool.type}
                          onChange={
                              (event: React.ChangeEvent<HTMLInputElement>) => {
                                  setType(event.target.value);
                              }
                          }
                          margin="normal"
                        />

                    </Box>

            <Box>

                {
                    prompt.custom && 
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


