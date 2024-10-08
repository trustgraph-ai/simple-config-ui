
import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useModelParamsStore } from './state/ModelParams';

const ParamsForm: React.FC = ({
}) => {

    const DEFINITIONS_PROMPT = "definitions-prompt";
    const RELATIONSHIPS_PROMPT = "relationships-prompt";
    const TOPICS_PROMPT = "topics-prompt";
    const KG_QUERY_PROMPT = "kg-query-prompt";

    const advancedOptions
        = useModelParamsStore((state) => state.advancedOptions);

    const setAdvancedOptions
        = useModelParamsStore((state) => state.setAdvancedOptions);

    const definitions = advancedOptions.has(DEFINITIONS_PROMPT);
    const relationships = advancedOptions.has(RELATIONSHIPS_PROMPT);
    const topics = advancedOptions.has(TOPICS_PROMPT);
    const kgQuery = advancedOptions.has(KG_QUERY_PROMPT);

    const set = (o : string, value : boolean) => {
        if (value) {
            const opts = new Set(advancedOptions);
            opts.add(o);
            setAdvancedOptions(opts);
        } else {
            const opts = new Set(advancedOptions);
            opts.delete(o);
            setAdvancedOptions(opts);
        }
    }

    const onDefinitions = (e) => {
        set(DEFINITIONS_PROMPT, !definitions);
    };

    const onRelationships = (e) => {
        set(RELATIONSHIPS_PROMPT, !relationships);
    };

    const onTopics = (e) => {
        set(TOPICS_PROMPT, !topics);
    };

    const onKgQuery = (e) => {
        set(KG_QUERY_PROMPT, !kgQuery);
    };

    return (

        <FormGroup>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={definitions}
                        onChange={onDefinitions}
                    />
                }
                label="edit definitions prompt"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={relationships}
                        onChange={onRelationships}
                    />
                }
                label="edit relationships prompt"
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={topics}
                        onChange={onTopics}
                    />
                }
                label="edit topics prompt"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={kgQuery}
                        onChange={onKgQuery}
                    />
                }
                label="edit knowledge graph prompt"
            />
        </FormGroup>

  );
};

export default ParamsForm;

