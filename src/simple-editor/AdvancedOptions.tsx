
import React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useModelParamsStore } from './state/ModelParams';

const ParamsForm: React.FC = ({
}) => {

    const DEFINITIONS_PROMPT = "definitions-prompt";

    const advancedOptions
        = useModelParamsStore((state) => state.advancedOptions);

    const setAdvancedOptions
        = useModelParamsStore((state) => state.setAdvancedOptions);

    const definitions = advancedOptions.has(DEFINITIONS_PROMPT);

    const onDefinitions = (e) => {

        if (!definitions) {
            const opts = new Set(advancedOptions);
            opts.add(DEFINITIONS_PROMPT);
            setAdvancedOptions(opts);
        } else {
            const opts = new Set(advancedOptions);
            opts.delete(DEFINITIONS_PROMPT);
            setAdvancedOptions(opts);
        }
        
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
        </FormGroup>

  );
};

export default ParamsForm;

