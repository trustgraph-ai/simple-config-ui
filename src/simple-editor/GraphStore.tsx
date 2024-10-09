import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
    Box, Stack, Typography, Avatar, Popover, Button, Divider,
    List, ListItemButton, ListItemText, Menu, ListItemIcon,
} from '@mui/material';

import {
    Psychology,
//    Spoke,
//    Plumbing,
//    Engineering,
//    Hub,
//    ChatBubble,
//    VerticalSplit,
//    MonitorHeart,
//    Polyline,
} from '@mui/icons-material';

import {
    Card, CardHeader, CardContent, CardActions, FormGroup, FormControlLabel,
    Checkbox
} from '@mui/material';

    const Option = ({
        enabled, onChange, avatar, title, content
    }) => {
        const bg = enabled ? '#d0e0f8' : 'white'
        return (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={enabled}
                            onChange={onChange}/>
                    }
                    label={
                        <Card
                            sx={{
                                width: '16rem',
                                backgroundColor: bg
                            }}
                        >
                            <CardHeader
                              avatar={avatar}
                              title={title}
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: 12 }}
                                >
                                {content}
                                </Typography>
                            </CardContent>
                        </Card>
                    }
                />
            </FormGroup>
        );
    };

interface GraphStoreProps {
  value: string;
  onChange: (value: string) => void;
}


const GraphStore: React.FC<GraphStoreProps> = ({ value, onChange }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>

        <FormControl fullWidth>

            <InputLabel id="graph-store-label">Graph Store</InputLabel>

            <Select
                labelId="graph-store-label"
                id="graph-store-select"
                value={value}
                label="Graph store"
                onChange={(e) => onChange(e.target.value)}
                sx={{minHeight: 90}}
            >

                <MenuItem value="cassandra">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack sx={{width: 100}} direction="column"
                        alignItems="center" justifyContent="center"
                        >

                           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg"
                                width="67"
                                height="45"
                            />

                        </Stack>

                        <Box sx={{
                            width: '32rem'
                        }}>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >
                                Apache Cassandra is an open-source, NoSQL
                                database that stores data for
                                applications that need fast read and write
                                performance at large scale.  The TrustGraph
                                integration integrates a graph schema with
                                read/write access.
                                
                            </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

                <MenuItem value="neo4j">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical"
                            flexItem
                        />}>
                        <Stack sx={{width: 100}} direction="row"
                        alignItems="center" justifyContent="center"
                        >
                                <img src="https://dist.neo4j.com/wp-content/uploads/20230926084108/Logo_FullColor_RGB_TransBG.svg" width="80"/>
                            </Stack>
                        <Box sx={{
                            width: '32rem'
                        }}>

                        <Typography variant="body2"
                            sx={{ whiteSpace: 'wrap' }}
                        >
                            Neo4j is a high-performance graph database that
                            stores data in the form of nodes and edges.
                            Neo4j is ideal for handling complex, connected
                            data such as social networks, fraud
                            detection systems, and recommendation
                            engines.
                        </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

            </Select>
        </FormControl>

    </>

  );
};

export default GraphStore;

