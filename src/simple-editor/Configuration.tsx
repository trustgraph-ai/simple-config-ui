
import React from 'react';

import { Typography, Box, Stack } from '@mui/material';
import { Tabs, Tab } from '@mui/material';

import ParamsForm from './ParamsForm';
import AdvancedOptions from './AdvancedOptions';
import { useModelParamsStore } from './state/ModelParams';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const tabs = (opts : Set<string>) => {

    const DEFINITIONS_PROMPT = "definitions-prompt";

    let tabs = [
        <Tab label="Model"/>,
        <Tab label="More"/>
    ];

    if (opts.has(DEFINITIONS_PROMPT))
        tabs.push(<Tab label="Definitions prompt"/>);

    return tabs;

}

const Configuration: React.FC = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const advancedOptions
        = useModelParamsStore((state) => state.advancedOptions);

    return (

        <>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {tabs(advancedOptions)}
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>

                <Typography variant="h5" component="h2" gutterBottom>
                  Model parameters
                </Typography>

                <ParamsForm/>

            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>

                <Typography variant="h5" component="h2" gutterBottom>
                  Additional configuration
                </Typography>

                <AdvancedOptions/>

            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>

                <Typography variant="h5" component="h2" gutterBottom>
                  Definitions prompt
                </Typography>

                <p>asdasdasd</p>

            </CustomTabPanel>

        </>

    );

}

export default Configuration;

