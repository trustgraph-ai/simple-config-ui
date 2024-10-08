import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';

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

import { Card, CardHeader, CardContent, CardActions } from '@mui/material';

interface GraphStoreProps {
  value: string;
  onChange: (value: string) => void;
}

const GraphStore: React.FC<GraphStoreProps> = ({ value, onChange }) => {
  return (
    <>
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
    </FormControl>
    <FormControl fullWidth>

    </FormControl>

    </>

  );
};

export default GraphStore;

