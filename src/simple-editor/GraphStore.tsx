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

const options = [
'Cassandra',
  <Box>
  <img src="https://dist.neo4j.com/wp-content/uploads/20230926084108/Logo_FullColor_RGB_TransBG.svg" width="80"/>

  </Box>, 
];

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
                sx={{minHeight: 120}}
            >

                <MenuItem value="cassandra">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Box sx={{width: 130}}>

                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg"
                                width="112"
                                height="75"
                                style={{ margin: 'auto' }}
                            />

                        </Box>

                        <Box sx={
                            {maxWidth: '14rem',
                            minWidth: '14rem',
                            width: '14rem'
                        }}>
                            <Typography variant="body2" sx={{width: '14rem'}}>
                                Apache Cassandra is an open-source, NoSQL
                                database that stores data<br/>for
                                applications that need fast read and write
                                performance. It's designed to<br/> handle
                                large amounts of structured,
                                semi-structured, and unstructured<br/>
                                data across multiple data centers and the
                                cloud.
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
                            <Box sx={{width: 130}}>
                                <img src="https://dist.neo4j.com/wp-content/uploads/20230926084108/Logo_FullColor_RGB_TransBG.svg" width="80"/>
                            </Box>
                        <Typography variant="body2" sx={{width: '14rem'}}>
                            Neo4j is a high-performance graph database that
                            stores data in the form<br/> of nodes and edges.
                            Neo4j is ideal for handling complex, connected
                            data<br/> such as social networks, fraud
                            detection systems, and recommendation<br/>
                            engines.
                        </Typography>
                    </Stack>
                </MenuItem>
            </Select>
        </FormControl>

    </>

  );
};

export default GraphStore;

