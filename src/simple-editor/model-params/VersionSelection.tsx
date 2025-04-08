
import React, { useEffect, useState } from 'react';

import {
    FormControl, InputLabel, Select, MenuItem, 
} from '@mui/material';

import { useConfigurationStateStore } from '../state/Configuration';

interface VersionSelectionProps {
}

const VersionSelection: React.FC<VersionSelectionProps> =
({}) => {
    type Version = any;
    const [versions, setVersions] = useState<Version[]>([]);

    const version
        = useConfigurationStateStore((state) => state.version);

//    const template
//        = useConfigurationStateStore((state) => state.template);

    const setVersion
        = useConfigurationStateStore((state) => state.setVersion);

    const setTemplate
        = useConfigurationStateStore((state) => state.setTemplate);

    useEffect(
        () => {
            fetch("/api/versions").then(
                x => x.json()
            ).then(
                x => {
                    setVersions(x);
                    setTemplate(x[0].template);
                    setVersion(x[0].version);
                }
            ).catch(
                err => console.log("Error:", err)
            );
        }
    );

  return (
    <>

        <FormControl fullWidth>

            <InputLabel id="graph-store-label">Version</InputLabel>

                <Select
                    value={version}
                    label="Version"
                    onChange={(e) => setVersion(e.target.value)}
                >
                    {
                        versions.map(
                            (v) => (
                                <MenuItem key={v.template}
                                    value={v.template}>
                                    {v.template} {v.status}
                                </MenuItem>
                            ))
                    }
                </Select>

        </FormControl>

    </>

  );
};

export default VersionSelection;
