
import React from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import { usePromptsStore } from '../state/Prompts';
import {
  useOptionsStore, CONFIGURE_OCR, CONFIGURE_EMBEDDINGS,
} from '../state/Options';
import { useDeploymentStore } from '../state/Deployment';
import { useVersionStateStore } from '../state/Version';

import ConfigurePrompts from '../prompts/ConfigurePrompts';
import ConfigureAgents from '../agents/ConfigureAgents';
import ConfigureOcr from '../ocr/ConfigureOcr';
import ConfigureEmbeddings from '../embeddings/ConfigureEmbeddings';
import Additional from './Additional';
import GenerateDeployment from './GenerateDeployment';
import Parameters from './Parameters';

interface TabPanelProps {
    children?: React.ReactNode;
    tabId: string;
    value: string;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, tabId, value, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== tabId}
            id={`simple-tabpanel-${tabId}`}
            aria-labelledby={`simple-tab-${tabId}`}
            {...other}
        >
            {value === tabId && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const tabs = (opts : Set<string>) => {

    let tabs = [
        <Tab key="model" value="model" label="Component Selection ✅"/>,
        <Tab key="more" value="more" label="Customization 🧰"/>
    ];

    if (opts.has(CONFIGURE_OCR))
        tabs.push(
            <Tab key="ocr" value="ocr" label="OCR 🧮"/>
        );

    if (opts.has(CONFIGURE_EMBEDDINGS))
        tabs.push(
            <Tab key="embeddings" value="embeddings" label="Embeddings 🕸"/>
        );

    tabs.push(<Tab key="depl" value="depl" label="Finish Deployment 🚀"/>);

    return tabs;

}

const Configuration: React.FC = () => {

    const [value, setValue] = React.useState("model");

    const setConfigUrl =
        useDeploymentStore((state) => state.setConfigUrl);

    usePromptsStore.subscribe(() => {
        setConfigUrl("");
    });

    useVersionStateStore.subscribe(() => {
        setConfigUrl("");
    });

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setValue(value);
    };

    const options
        = useOptionsStore((state) => state.options);

    return (

        <>

            <Box className="configuration">

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value} onChange={handleChange}
                    variant="scrollable"
                >
                    {tabs(options)}
                </Tabs>
            </Box>

            <CustomTabPanel value={value} tabId="model">
                <Parameters/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="more">
                <Additional/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="prompts">
                <ConfigurePrompts/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="agents">
                <ConfigureAgents/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="ocr">
                <ConfigureOcr/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="embeddings">
                <ConfigureEmbeddings/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="depl">
               <GenerateDeployment/>
            </CustomTabPanel>

            </Box>

        </>

    )

}

export default Configuration;

