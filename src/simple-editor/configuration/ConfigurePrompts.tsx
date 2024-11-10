
import React from 'react';

import { Typography, Box, Stack, Button } from '@mui/material';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ChatBubble, Add } from '@mui/icons-material';

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

    const systemPrompt
        = usePromptsStore((state) => state.system);

    const setSystemPrompt
        = usePromptsStore((state) => state.setSystem);

    const definitionsPrompt
        = usePromptsStore((state) => state.definitions);

    const setDefinitionsPrompt
        = usePromptsStore((state) => state.setDefinitions);

    const relationshipsPrompt
        = usePromptsStore((state) => state.relationships);

    const setRelationshipsPrompt
        = usePromptsStore((state) => state.setRelationships);

    const topicsPrompt
        = usePromptsStore((state) => state.topics);

    const setTopicsPrompt
        = usePromptsStore((state) => state.setTopics);

    const rowsPrompt = usePromptsStore((state) => state.rows);

    const setRowsPrompt = usePromptsStore((state) => state.setRows);

    const knowledgeQueryPrompt
        = usePromptsStore((state) => state.knowledgeQuery);

    const setKnowledgeQueryPrompt
        = usePromptsStore((state) => state.setKnowledgeQuery);

    const documentQueryPrompt
        = usePromptsStore((state) => state.documentQuery);

    const setDocumentQueryPrompt
        = usePromptsStore((state) => state.setDocumentQuery);

    const prompts = [
        {
            id: "system",
            name: "System",
            icon: <ChatBubble/>,
            value: systemPrompt,
            set: setSystemPrompt,
            help: <SystemPromptHelp/>,
        },
        {
            id: "ext-defs",
            name: "Extract Definitions",
            icon: <ChatBubble/>,
            value: definitionsPrompt,
            set: setDefinitionsPrompt,
            help: <ExtractDefinitionsPromptHelp/>,
        },
        {
            id: "ext-rels",
            name: "Extract Relationships",
            icon: <ChatBubble/>,
            value: relationshipsPrompt,
            set: setRelationshipsPrompt,
            help: <ExtractRelationshipsPromptHelp/>,
        },
        {
            id: "ext-topics",
            name: "Extract Topics",
            icon: <ChatBubble/>,
            value: topicsPrompt,
            set: setTopicsPrompt,
            help: <ExtractTopicsPromptHelp/>,
        },
        {
            id: "ext-rows",
            name: "Extract Rows",
            icon: <ChatBubble/>,
            value: rowsPrompt,
            set: setRowsPrompt,
            help: <ExtractRowsPromptHelp/>,
        },
        {
            id: "kg-query",
            name: "Knowledge Graph Query",
            icon: <ChatBubble/>,
            value: knowledgeQueryPrompt,
            set: setKnowledgeQueryPrompt,
            help: <KnowledgeQueryPromptHelp/>,
        },
        {
            id: "doc-query",
            name: "Document Query",
            icon: <ChatBubble/>,
            value: documentQueryPrompt,
            set: setDocumentQueryPrompt,
            help: <DocumentQueryPromptHelp/>,
        }
    ];

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
        console.log("Add prompt");
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
                                           {p.icon}
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

                <Box>
                    { ( prompt.help ) }
                </Box>

                <Box>
                    <Prompt
                        value={prompt.value}
                        onChange={prompt.set}
                    />
                </Box>

            </Stack>
            
        </Stack>

    </>);
};

export default ConfigurePrompts;

