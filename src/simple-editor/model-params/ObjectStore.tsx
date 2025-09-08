import React from 'react';

import {
    FormControl, InputLabel, Select, MenuItem, Box, Stack, Divider,
    Typography,
} from '@mui/material';

interface ObjectStoreProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const background = "#c8d4c6";

const ObjectStore: React.FC<ObjectStoreProps> = ({ value, onChange, disabled = false }) => {

  return (
    <>

        <FormControl fullWidth disabled={disabled}>

            <InputLabel id="object-store-label">Object store</InputLabel>

            <Select
                labelId="object-store-label"
                id="object-store-select"
                value={value}
                label="Object store"
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
                                performance at large scale. Used for
                                object storage in TrustGraph.
                                
                            </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

            </Select>

        </FormControl>

    </>

  );
};

export default ObjectStore;