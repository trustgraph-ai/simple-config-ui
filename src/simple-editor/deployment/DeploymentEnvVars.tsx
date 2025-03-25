
import React from 'react'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

interface DeploymentEnvVarsProps {
    variables : {
        name : string;
        value : string;
    }[];
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    // Deep grey background for dark theme
    backgroundColor: theme.palette.grey[900], 
    padding: theme.spacing(2), // Add some padding inside the paper
    margin: theme.spacing(2), // Add some padding inside the paper
    borderRadius: theme.shape.borderRadius, // Use theme's border radius
    overflowX: 'auto', // Allow horizontal scrolling for long code blocks
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[100], // Light grey color for code text
    fontFamily: 'monospace',      // Monospace font for code
    whiteSpace: 'pre-wrap',     // Allow line breaks within the pre tag
    wordBreak: 'break-word',
}));

const DeploymentEnvVars : React.FC<DeploymentEnvVarsProps> =
({variables}) => {

    return (
        <StyledPaper elevation={3}> 
            <StyledTypography variant="body2">
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
            </StyledTypography>
        </StyledPaper>   
    );
}

export default DeploymentEnvVars;

