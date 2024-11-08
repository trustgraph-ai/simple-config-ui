

import { Stack } from '@mui/material';
import {
    Psychology,
//    Spoke,
//    Plumbing,
//    Engineering,
//    Hub,
//    ChatBubble,
//    VerticalSplit,
//    MonitorHeart,
//    Polyline,
} from '@mui/icons-material';
import { useDeploymentStore } from '../state/Deployment';

import {
    useOptionsStore, SYSTEM_PROMPT, DEFINITIONS_PROMPT, RELATIONSHIPS_PROMPT,
    TOPICS_PROMPT, KNOWLEDGE_QUERY_PROMPT, DOCUMENT_QUERY_PROMPT,
    ROWS_PROMPT,
} from '../state/Options';

import Option from './Option';

const ParamsForm: React.FC = ({
}) => {

    const options = useOptionsStore((state) => state.options);

    const setOptions = useOptionsStore((state) => state.setOptions);

    const setConfigUrl =
        useDeploymentStore((state) => state.setConfigUrl);

    useOptionsStore.subscribe(() => {
        setConfigUrl("");
    });

    const system = options.has(SYSTEM_PROMPT);
    const definitions = options.has(DEFINITIONS_PROMPT);
    const relationships = options.has(RELATIONSHIPS_PROMPT);
    const topics = options.has(TOPICS_PROMPT);
    const kgQuery = options.has(KNOWLEDGE_QUERY_PROMPT);
    const docQuery = options.has(DOCUMENT_QUERY_PROMPT);
    const rows = options.has(ROWS_PROMPT);

    const set = (o : string, value : boolean) => {
        if (value) {
            const opts = new Set(options);
            opts.add(o);
            setOptions(opts);
        } else {
            const opts = new Set(options);
            opts.delete(o);
            setOptions(opts);
        }
    }

    const onSystem = () => {
        set(SYSTEM_PROMPT, !system);
    };

    const onDefinitions = () => {
        set(DEFINITIONS_PROMPT, !definitions);
    };

    const onRelationships = () => {
        set(RELATIONSHIPS_PROMPT, !relationships);
    };

    const onTopics = () => {
        set(TOPICS_PROMPT, !topics);
    };

    const onKgQuery = () => {
        set(KNOWLEDGE_QUERY_PROMPT, !kgQuery);
    };

    const onDocQuery = () => {
        set(DOCUMENT_QUERY_PROMPT, !docQuery);
    };

    const onRows = () => {
        set(ROWS_PROMPT, !rows);
    };

    return (
        <>

            <Stack direction="row" spacing={2}
                sx={{flexWrap: 'wrap'}} useFlexGap
            >

                <Option
                    enabled={system}
                    onChange={onSystem}
                    avatar={<Psychology color="primary"/>}
                    title="LLM System Prompt"
                    content={
                        'Specify the system prompt for the chosen LLM.'
                    }

                />

                <Option
                    enabled={definitions}
                    onChange={onDefinitions}
                    avatar={<Psychology color="primary"/>}
                    title="Entity Definitions Prompt"
                    content={
                        'Specify the types of entities to extract.'
                    }

                />

                <Option
                    enabled={relationships}
                    onChange={onRelationships}
                    avatar={<Psychology color="primary"/>}
                    title="Relationships Prompt"
                    content={
                        'Customize the types of semantic relationships to extract.'
                    }

                />

                <Option
                    enabled={topics}
                    onChange={onTopics}
                    avatar={<Psychology color="primary"/>}
                    title="Topic Prompt"
                    content={
                        'Define the intangible concepts to extract.'
                    }

                />

                <Option
                    enabled={kgQuery}
                    onChange={onKgQuery}
                    avatar={<Psychology color="primary"/>}
                    title="Knowledge Graph Prompt"
                    content={
                        'Tailor the default knowledge graph query prompt'
                    }

                />

                <Option
                    enabled={docQuery}
                    onChange={onDocQuery}
                    avatar={<Psychology color="primary"/>}
                    title="Document Prompt"
                    content={
                        'Tailor the default document query prompt'
                    }

                />

                <Option
                    enabled={rows}
                    onChange={onRows}
                    avatar={<Psychology color="primary"/>}
                    title="Row Extraction Prompt"
                    content={
                        'Tailor the default row extraction prompt'
                    }

                />

            </Stack>

        </>

    );
};

export default ParamsForm;

