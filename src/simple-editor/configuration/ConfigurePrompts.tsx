
import React from 'react';

import { Typography, Box, Stack } from '@mui/material';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Inbox } from '@mui/icons-material';
import { Drafts } from '@mui/icons-material';

import Prompt from '../options/Prompt';
import { usePromptsStore } from '../state/Prompts';

const SystemPrompt = ({
}) => {

    const prompts = [
        {
            id: "system",
            name: "System",
            icon: <Inbox />,
            
        },
        {
            id: "ext-defs",
            name: "Extract Definitions",
            icon: <Inbox />,
            
        }
    ];

    const [selected, setSelected] = React.useState(prompts[0].id);

console.log(selected);

    const handleSelect = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
    console.log("id", id);
        setSelected(id);
    };

    return (<>

        <Typography variant="h5" component="h2" gutterBottom>
            Configure Prompts
        </Typography>

        <Stack direction="row" spacing={2}>

            <Box>

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
            </Box>

            <Stack direction="column" spacing={2}>

                <Box>
                asdasdasd
                </Box>

                <Box>
                asdasdasd
                </Box>

            </Stack>
            
        </Stack>

    </>);
};

export default SystemPrompt;

