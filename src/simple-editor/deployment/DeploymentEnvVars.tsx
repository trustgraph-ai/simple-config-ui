
import { Stack, Box, Typography, Paper, } from '@mui/material';

const DeploymentEnvVars = ({variables}) => {
console.log(variables);
    return (
        <pre>
            {
                variables.map(
                    (va) => {
                        return (
                            <>
                                {va.name} = <span className="variable">
                                    {va.value}
                                </span>
                                <br/>
                            </>
                        );
                    }
                )
            }
        </pre>
    );
}

export default DeploymentEnvVars;

