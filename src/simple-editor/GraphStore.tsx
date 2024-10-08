import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box, Stack, Typography, Avatar, Popover, Button } from '@mui/material';

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    <>



{/*
    <FormControl fullWidth>
      <InputLabel>Graph Store</InputLabel>


      <Select
        value={value}
        label="Graph Store"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="cassandra">Cassandra</MenuItem>
        <MenuItem value="neo4j">
            <Stack direction="row" alignItems="center" spacing={2}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Neo4j-logo_color.png/800px-Neo4j-logo_color.png?20210429151518" style={{ height: "2rem" }}/>
            <Box>Neo4j</Box>
            <Box sx={{ fontSize: 12 }}>
                Neo4j is a graph database management system.  The data
                elements Neo4j stores are nodes, edges connecting them, and
                attributes of nodes and edges.
            </Box>
            </Stack>
        </MenuItem>
      </Select>

*/
}


{/*
    </FormControl>
    */}

<Box>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
      <Stack>
      <Box>{ value }</Box>
        <Box sx={{fontSize: 8}}>asldkjaslkdja slkdasd alskjdasd</Box>
        </Stack>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
<Stack direction="row">

                <Option
                    enabled={value=='cassandra'}
                    onChange={() => onChange('cassandra')}
                    avatar={<Psychology color="primary"/>}
                    title="Cassandra"
                    content={
                        'Apache Cassandra'
                    }

                />

                <Option
                    enabled={value=='neo4j'}
                    onChange={() => onChange('neo4j')}
                    avatar={
                        <Avatar
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Neo4j-logo_color.png/800px-Neo4j-logo_color.png?20210429151518"
                            alt="Neo4j"
                            variant="rounded"
                            size="xl"
                        />
                    }
                    title="Neo4j"
                    content={
                        'Neo4j'
                    }

                />
</Stack>

      </Popover>
</Box>

    </>

  );
};

export default GraphStore;

