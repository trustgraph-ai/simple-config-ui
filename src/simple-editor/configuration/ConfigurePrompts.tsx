
import React from 'react';

import { Typography, Box, Stack, Button } from '@mui/material';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { ListItemAvatar, Avatar, ListItemIcon } from '@mui/material';
import { ChatBubble, Add, Delete } from '@mui/icons-material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

import SystemPromptHelp from './help/SystemPrompt';
import ExtractDefinitionsPromptHelp from './help/ExtractDefinitionsPrompt';
import ExtractRelationshipsPromptHelp from './help/ExtractRelationshipsPrompt';
import ExtractTopicsPromptHelp from './help/ExtractTopicsPrompt';
import ExtractRowsPromptHelp from './help/ExtractRowsPrompt';
import KnowledgeQueryPromptHelp from './help/KnowledgeQueryPrompt';
import DocumentQueryPromptHelp from './help/DocumentQueryPrompt';

const ConfigurePrompts = ({
}) => {

    const prompts = usePromptsStore((state) => state.prompts);

    const setPrompts
        = usePromptsStore((state) => state.setPrompts);

    const helps = {
        "system": <SystemPromptHelp/>,
        "definitions": <ExtractDefinitionsPromptHelp/>,
        "relationships": <ExtractRelationshipsPromptHelp/>,
        "topics": <ExtractTopicsPromptHelp/>,
        "rows": <ExtractRowsPromptHelp/>,
        "knowledge-query": <KnowledgeQueryPromptHelp/>,
        "document-query": <DocumentQueryPromptHelp/>,
    };

    const [selected, setSelected] = React.useState(prompts[0].id);

    let prompt : any = null;
    for (let p of prompts) {
       if (p.id == selected) prompt = p;
    }

    const handleSelect = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
        setSelected(id);
    };

    const addPrompt = () => {

        const count = prompts.length;
        const newId = "custom-prompt-" + (count + 1).toString();

        const newPrompt = {
            id: newId,
            name: "Custom prompt " + (count + 1).toString(),
            prompt: "",
            custom: true,
        };

        setPrompts([...prompts, newPrompt]);
        setSelected(newId);
        
    };

    const deletePrompt = () => {

        const newPrompts = prompts.filter(p => (p.id != selected));

        setPrompts(newPrompts);
        setSelected(newPrompts[0].id);

    };

    const onChange = (newVal) => {
        const newPrompts = prompts.map(
            p => {
                if (p.id == selected) {
                    const newP = {
                        ...p,
                        prompt: newVal,
                    };
                    return newP;
                } else {
                    return p;
                }
            }
        );
        setPrompts(newPrompts);
    };

    return (<>

        <Stack direction="row" spacing={2}>

            <Box>

                <Typography variant="h5" component="h2" gutterBottom>
                    Configure Prompts
                </Typography>

                <List component="nav" aria-label="prompts">

                    {
                        prompts.map(
                           p => {
                               return (
                                   <ListItemButton
                                       key={p.id}
                                       selected={selected == p.id}
                                       onClick={(event) =>
                                           handleSelect(event, p.id)
                                       }
                                   >
                                       <ListItemIcon>
                                           <ChatBubble/>
                                       </ListItemIcon>
                                       <ListItemText primary={p.name}/>
                                   </ListItemButton>
                               );
                           }
                        )
                    }
                </List>

                <Box>

                    <Button
                        startIcon={<Add/>}
                        variant="contained"
                        onClick={ addPrompt }
                    >
                        Add prompt
                    </Button>

                </Box>

            </Box>

            <Stack
                direction="column" spacing={2}
            >

                <Typography
                    variant="h5" component="h2" gutterBottom
                >
                    { prompt.name }
                </Typography>

                {
                    (helps[selected]) &&
                    <Box>
                        { helps[selected] }
                    </Box>
                }

                <Box>
                    <Prompt
                        value={prompt.prompt}
                        onChange={onChange}
                    />
                </Box>

                <Box>

                    <Button
                        startIcon={<Delete/>}
                        variant="contained"
                        onClick={ deletePrompt }
                    >
                        Delete this prompt
                    </Button>

                </Box>

            </Stack>
            
        </Stack>

    </>);
};

export default ConfigurePrompts;

