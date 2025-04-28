
import React, { useEffect, useState } from 'react';

import {
    FormControl, InputLabel, Select, MenuItem, Chip, Typography
} from '@mui/material';

import Grid from '@mui/material/Grid2';

import { useVersionStateStore, Version } from '../state/Version';

interface VersionSelectionProps {
}

const VersionSelection: React.FC<VersionSelectionProps> =
({}) => {

    const [versions, setVersions] = useState<Version[]>([]);

    const version
        = useVersionStateStore((state) => state.version);

    const setVersion
        = useVersionStateStore((state) => state.setVersion);

    const selectVersion = (templ : string) => {
        versions.map(
            (v) => {
                if (v.template == templ) setVersion(v);
            }
        );
    };

    useEffect(
        () => {
            fetch("/api/versions").then(
                x => x.json()
            ).then(
                x => {

                    let latest : Version | null = null;

                    // Get latest stable.
                    for (let v of x) {
                        if (v.status == "stable") latest = v;
                    }

                    setVersions(x);

                    if (latest) setVersion(latest);

                }
            ).catch(
                err => console.log("Error:", err)
            );
        },
        []
    );

  return (
    <>

        <FormControl fullWidth>

            <InputLabel id="graph-store-label">Version</InputLabel>

                <Select
                    value={version.template}
                    label="Version"
                    onChange={(e) => selectVersion(e.target.value)}
                    sx={{ height: '7rem' }}
                >
                    {
                        versions.map(
                            (v) => (
                                <MenuItem
                                    key={v.template}
                                    value={v.template}>

                                  <Grid
                                      container
                                      spacing={1}
                                      alignItems="center"
                                      sx={{ width: '95%' }}
                                  >
                                    <Grid size={12}>
                                      <Typography
                                          variant="subtitle1"
                                          fontWeight="bold"
                                          component="div"
                                      >
                                          TrustGraph {v.version}
                                      </Typography>
                                    </Grid>
                                    <Grid size={8}>
                                      <Typography
                                          variant="body2"
                                          color="text.secondary"
                                          component="div"
                                          sx={{ whiteSpace: 'wrap' }}
                                      >
                                          {v.description}
                                      </Typography>
                                    </Grid>
                                    <Grid size={4} textAlign="right">
                                      <Chip
                                        label={v.status}
                                        size="small"
                                        sx={{
                                          ml: 1,
                                          backgroundColor: "#f3f2fd",
                                          color: "#1976d2",
                                          fontWeight: 500,
                                          fontSize: "0.7rem",
                                        }}
                                      />
                                    </Grid>
                                  </Grid>

                                </MenuItem>
                            ))
                    }
                </Select>

        </FormControl>

    </>

  );
};

export default VersionSelection;

