
import React from 'react';
import { Stack, Typography, Box, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Psychology, ChatBubble, Insights } from '@mui/icons-material';
import { useDeploymentStore } from '../state/Deployment';

import {
    useOptionsStore, CONFIGURE_PROMPTS, CONFIGURE_AGENTS,
    CONFIGURE_WORKBENCH,
} from '../state/Options';

interface OptionProps extends React.PropsWithChildren {
    enabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    avatar: React.ReactNode;
    title: string;
}

const StyledOption = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    minWidth: '200px',
    maxWidth: '350px',
    flex: '1 1 auto',
    [theme.breakpoints.down('sm')]: {
        minWidth: '90%',
        maxWidth: '100%',
    }
}));


const StyledOptionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    display: 'flex',  // Added for alignment
    alignItems: 'center', // Vertically align the title and the switch
    justifyContent: 'space-between', // Push the switch to the right
}));

const StyledOptionDescription = styled(Typography)(({ theme }) => ({
    whiteSpace: 'normal',
    wordBreak: 'break-word',
}));


const Option: React.FC<OptionProps> = ({ enabled, onChange, avatar, title, children }) => {
    return (
        <StyledOption>
            <StyledOptionTitle variant="h6" component="h3">
               {title}
               <Switch checked={enabled} onChange={onChange}  inputProps={{ 'aria-label': 'controlled' }} />
            </StyledOptionTitle>

            <StyledOptionDescription variant="body2">
                {children}
            </StyledOptionDescription>

        </StyledOption>
    );
};

const ParamsForm: React.FC = () => {

    const options = useOptionsStore((state) => state.options);
    const setOptions = useOptionsStore((state) => state.setOptions);
    const setConfigUrl =
        useDeploymentStore((state) => state.setConfigUrl);

    useOptionsStore.subscribe(() => {
        setConfigUrl("");
    });

    const configurePrompts = options.has(CONFIGURE_PROMPTS);
    const configureAgents = options.has(CONFIGURE_AGENTS);
    const configureWorkbench = options.has(CONFIGURE_WORKBENCH);

    const set = (o: string, value: boolean) => {
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

   const onConfigurePrompts = (event: React.ChangeEvent<HTMLInputElement>) => {
        set(CONFIGURE_PROMPTS, event.target.checked);
    };

   const onConfigureAgents = (event: React.ChangeEvent<HTMLInputElement>) => {
        set(CONFIGURE_AGENTS, event.target.checked);
    };

  const onConfigureWorkbench = (event: React.ChangeEvent<HTMLInputElement>) => {
        set(CONFIGURE_WORKBENCH, event.target.checked);
    };


    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                sx={{ flexWrap: 'wrap', width: '100%' }}
                useFlexGap
            >
                <Option
                    enabled={configurePrompts}
                    onChange={onConfigurePrompts}
                    avatar={<ChatBubble color="primary" />}
                    title="Data Extraction Prompts"
                >
                    Tailor the LLM system prompts, data extraction prompts,
                    and RAG query prompts.
                </Option>

                <Option
                    enabled={configureAgents}
                    onChange={onConfigureAgents}
                    avatar={<Psychology color="primary" />}
                    title="Agent Tools"
                >
                    Add Agents that use a ReAct approach. Customize the
                    Agent definitions, options, and arguments.
                </Option>

                <Option
                    enabled={configureWorkbench}
                    onChange={onConfigureWorkbench}
                    avatar={<Insights color="primary" />}
                    title="Workbench UI"
                >
                    An experimental UI providing some tools to interact with
                    data. Once launched, accessible on port 8888.
                </Option>

            </Stack>
        </>
    );
};

export default ParamsForm;

