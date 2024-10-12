
import React from 'react';

import { Stack, Box, Typography, Paper, } from '@mui/material';

const DeploymentEnvVars = ({variables}) => {
console.log(variables);
    return (
        <pre>
            {
                variables.map(
                    (va) => {
                        return (
                            <React.Fragment key={va.name}>
                                export {va.name}=<span className="variable">
                                    {va.value}
                                </span>
                                <br/>
                            </React.Fragment>
                        );
                    }
                )
            }
        </pre>
    );
}

export default DeploymentEnvVars;

