

import { Stack } from '@mui/material';
import { Psychology, ChatBubble } from '@mui/icons-material';
import { useDeploymentStore } from '../state/Deployment';

import {
    useOptionsStore, CONFIGURE_PROMPTS, CONFIGURE_AGENTS
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

    const configurePrompts = options.has(CONFIGURE_PROMPTS);
    const configureAgents = options.has(CONFIGURE_AGENTS);

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

    const onConfigurePrompts = () => {
        set(CONFIGURE_PROMPTS, !configurePrompts);
    };

    const onConfigureAgents = () => {
        set(CONFIGURE_AGENTS, !configureAgents);
    };

    return (
        <>

            <Stack direction="row" spacing={2}
                sx={{flexWrap: 'wrap'}} useFlexGap
            >

                <Option
                    enabled={configurePrompts}
                    onChange={onConfigurePrompts}
                    avatar={<ChatBubble color="primary"/>}
                    title="Configure prompts"
                    content={
                        'Tailor the prompts for the chosen LLM.'
                    }

                />

                <Option
                    enabled={configureAgents}
                    onChange={onConfigureAgents}
                    avatar={<Psychology color="primary"/>}
                    title="Configure agents"
                    content={
                        'Add agent configuration and define the flow.'
                    }

                />

            </Stack>

        </>

    );
};

export default ParamsForm;

