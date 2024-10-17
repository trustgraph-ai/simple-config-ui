
import React from 'react';

import { Box, Tabs, Tab } from '@mui/material';

import { usePromptsStore } from '../state/Prompts';
import {
    useOptionsStore, DEFINITIONS_PROMPT, RELATIONSHIPS_PROMPT,
    TOPICS_PROMPT, KNOWLEDGE_QUERY_PROMPT, DOCUMENT_QUERY_PROMPT,
    ROWS_PROMPT,
} from '../state/Options';
import { useDeploymentStore } from '../state/Deployment';

import DefinitionsPrompt from './DefinitionsPrompt';
import RelationshipsPrompt from './RelationshipsPrompt';
import TopicsPrompt from './TopicsPrompt';
import KnowledgeQueryPrompt from './KnowledgeQueryPrompt';
import DocumentQueryPrompt from './DocumentQueryPrompt';
import RowsPrompt from './RowsPrompt';
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
        <Tab key="model" value="model" label="Model"/>,
        <Tab key="more" value="more" label="Next ➡"/>
    ];

    if (opts.has(DEFINITIONS_PROMPT))
        tabs.push(<Tab key="defs" value="defs" label="Entity Definitions Prompt"/>);

    if (opts.has(RELATIONSHIPS_PROMPT))
        tabs.push(<Tab key="rels" value="rels" label="Relationships Prompt"/>);

    if (opts.has(TOPICS_PROMPT))
        tabs.push(<Tab key="topics" value="topics" label="Topic Definitions Prompt"/>);

    if (opts.has(KNOWLEDGE_QUERY_PROMPT))
        tabs.push(<Tab key="kgq" value="kgq" label="Knowledge Graph Prompt"/>);

    if (opts.has(DOCUMENT_QUERY_PROMPT))
        tabs.push(<Tab key="docq" value="docq"
            label="Document Query Prompt"
        />);

    if (opts.has(ROWS_PROMPT))
        tabs.push(<Tab key="rows" value="rows"
            label="Rows Prompt"
        />);

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

            <CustomTabPanel value={value} tabId="defs">
                <DefinitionsPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="rels">
                <RelationshipsPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="topics">
                <TopicsPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="kgq">
                <KnowledgeQueryPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="docq">
                <DocumentQueryPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="rows">
               <RowsPrompt/>
            </CustomTabPanel>

            <CustomTabPanel value={value} tabId="depl">
               <GenerateDeployment/>
            </CustomTabPanel>

            </Box>

        </>

    );

}

export default Configuration;

