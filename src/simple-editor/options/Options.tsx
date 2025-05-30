import React from 'react';
import { Stack, Typography, Box, Switch, styled } from '@mui/material';
import { useDeploymentStore } from '../state/Deployment';
import {
    useOptionsStore, CONFIGURE_PROMPTS, CONFIGURE_AGENTS,
    CONFIGURE_WORKBENCH, CONFIGURE_DOCUMENT_RAG, CONFIGURE_OCR,
    CONFIGURE_EMBEDDINGS,
} from '../state/Options';

interface OptionProps extends React.PropsWithChildren {
    enabled: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
}

const StyledOption = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected: boolean }>(({ theme, selected }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.paper,
    color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    minWidth: '200px',
    maxWidth: '350px',
    flex: '1 1 auto',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    [theme.breakpoints.down('sm')]: {
        minWidth: '90%',
        maxWidth: '100%',
    }
}));

const StyledOptionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const StyledOptionDescription = styled(Typography)(() => ({  // Fixed: Removed theme parameter since not used
    whiteSpace: 'normal',
    wordBreak: 'break-word',
}));


const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main + '08',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.common.white,
    },
    '& .MuiSwitch-track': {
        backgroundColor: theme.palette.grey[500],
    }
}));


const Option: React.FC<OptionProps> = ({ enabled, onChange, title, children }) => {
    return (
        <StyledOption selected={enabled}>
             <StyledOptionTitle>
               <Typography variant="h6" component="span">
                     {title}
                 </Typography>
                <StyledSwitch checked={enabled} onChange={onChange} inputProps={{ 'aria-label': 'controlled' }} />
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
    const setConfigUrl = useDeploymentStore((state) => state.setConfigUrl);

    useOptionsStore.subscribe(() => {
        setConfigUrl("");
    });

    const configurePrompts = options.has(CONFIGURE_PROMPTS);
    const configureAgents = options.has(CONFIGURE_AGENTS);
    const configureWorkbench = options.has(CONFIGURE_WORKBENCH);
    const configureDocumentRag = options.has(CONFIGURE_DOCUMENT_RAG);
    const configureOcr = options.has(CONFIGURE_OCR);
    const configureEmbeddings = options.has(CONFIGURE_EMBEDDINGS);

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

    const onConfigureWorkbench =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            set(CONFIGURE_WORKBENCH, event.target.checked);
        };

    const onConfigureDocumentRag =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            set(CONFIGURE_DOCUMENT_RAG, event.target.checked);
        };

    const onConfigureOcr =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            set(CONFIGURE_OCR, event.target.checked);
        };

    const onConfigureEmbeddings =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            set(CONFIGURE_EMBEDDINGS, event.target.checked);
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
                    title="LLM Prompt Manager"
                >
                    Tailor the LLM system prompts, data extraction prompts,
                    RAG query prompts, and the Agent Tool Router.
                </Option>

                <Option
                    enabled={configureAgents}
                    onChange={onConfigureAgents}
                    title="Agent Tools"
                >
                    Add Agents that use a ReAct approach. Customize the
                    Agent definitions, options, and arguments.
                </Option>

                <Option
                    enabled={configureWorkbench}
                    onChange={onConfigureWorkbench}
                    title="Test Suite"
                >
                    A UI providing tools to explore TrustGraph system
                    performance. Once launched, accessible on port 8888.
                </Option>

                <Option
                    enabled={configureDocumentRag}
                    onChange={onConfigureDocumentRag}
                    title="Document RAG"
                >
                    Enables pipelines for Document RAG aka Vector RAG. This
                    is typically an inferior experience to Graph RAG
                    and is made available for comparison testing purposes.
                </Option>

                <Option
                    enabled={configureOcr}
                    onChange={onConfigureOcr}
                    title="OCR Pipelines"
                >
                    Options for replacing the standard PDF decoding with an
                    Optical Character Recognition (OCR) processor to allow
                    handling PDF documents containing scans/images.
                </Option>

                <Option
                    enabled={configureEmbeddings}
                    onChange={onConfigureEmbeddings}
                    title="Embeddings Configuration"
                >
                    Options for configuration the embeddings engine.
                </Option>

            </Stack>
        </>
    );
};

export default ParamsForm;

