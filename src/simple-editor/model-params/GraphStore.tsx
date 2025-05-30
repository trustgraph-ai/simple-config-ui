import React from 'react';

import {
    FormControl, InputLabel, Select, MenuItem, Box, Stack, Divider,
    Typography,
} from '@mui/material';

interface GraphStoreProps {
  value: string;
  onChange: (value: string) => void;
}

const background = "#c8d4c6";

const GraphStore: React.FC<GraphStoreProps> = ({ value, onChange }) => {

  return (
    <>

        <FormControl fullWidth>

            <InputLabel id="graph-store-label">Graph store</InputLabel>

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
                        <Stack direction="column"
                            alignItems="center" justifyContent="center"
                            sx={{
                                width: 140,
                                backgroundColor: background,
                            }}
                        >

                           <img src="cassandra.svg"
                                width="67"
                                height="45"
                            />

                        </Stack>

                        <Box sx={{
                            width: '36rem'
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
                        <Stack direction="row"
                            alignItems="center" justifyContent="center"
                            sx={{
                                width: 140,
                                backgroundColor: background,
                            }}
                        >
                                <img src="neo4j.svg" width="80"/>
                            </Stack>
                        <Box sx={{
                            width: '36rem'
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

                <MenuItem value="memgraph">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical"
                            flexItem
                        />}>
                        <Stack direction="row"
                            alignItems="center" justifyContent="center"
                            sx={{
                                backgroundColor: background,
                                width: 140,
                            }}
                        >
                                <img src="memgraph.svg" width="80"/>
                            </Stack>
                        <Box sx={{
                            width: '36rem'
                        }}>

                        <Typography variant="body2"
                            sx={{ whiteSpace: 'wrap' }}
                        >

                            Unlike alternatives, Memgraph uses a
                            modern efficient architecture that
                            operates at C++ speed with high throughput
                            and low latency. It is perfect for high
                            velocity environments of 1000 transactions
                            per second or more.

                        </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

                <MenuItem value="falkordb">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack direction="column"
                            alignItems="center" justifyContent="center"
                            sx={{
                                width: 140,
                                backgroundColor: background,
                            }}
                        >

                           <img src="falkordb.svg"
                                width="67"
                                height="45"
                            />

                        </Stack>

                        <Box sx={{
                            width: '36rem'
                        }}>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >

                                FalkorDB is a blazing fast graph database
                                used for low latency & high throughput
                                scenarios, under the hood it runs GraphBLAS
                                to perform graph operations using sparse
                                linear algebra.
                                
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

