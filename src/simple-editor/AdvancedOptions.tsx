
import React from 'react';

import { FormGroup, FormControlLabel } from '@mui/material';
import { Checkbox, Typography, Button } from '@mui/material';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { Stack } from '@mui/material';
import {
    Psychology,
} from '@mui/icons-material';

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
        <>

            <Stack direction="row">

                <Card variant="outlined" sx={{ width: '16rem', m: 1 }}>
                    <CardHeader
                      avatar={<Psychology color="primary"/>}
                      title="Definitions prompt"
                    />
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={definitions}
                                        onChange={onDefinitions}/>
                                }
                                label={
                                    <Typography variant="body2">
                                    Tailor the default definitions-extraction
                                    prompt
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ width: '16rem', m : 1 }}>
                    <CardHeader
                      avatar={<Psychology color="primary"/>}
                      title="Relationships prompt"
                    />
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={relationships}
                                        onChange={onRelationships}/>
                                }
                                label={
                                    <Typography variant="body2">
                                    Tailor the default
                                    relationships-extraction prompt
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ width: '16rem', m : 1 }}>
                    <CardHeader
                      avatar={<Psychology color="primary"/>}
                      title="Topics prompt"
                    />
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={topics}
                                        onChange={onTopics}/>
                                }
                                label={
                                    <Typography variant="body2">
                                    Tailor the default
                                    topics-extraction prompt
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ width: '16rem', m : 1 }}>
                    <CardHeader
                      avatar={<Psychology color="primary"/>}
                      title="Knowledge graph prompt"
                    />
                    <CardContent>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={kgQuery}
                                        onChange={onKgQuery}/>
                                }
                                label={
                                    <Typography variant="body2">
                                    Tailor the default
                                    knowledge-graph query prompt
                                    </Typography>
                                }
                            />
                        </FormGroup>
                    </CardContent>
                </Card>

            </Stack>

        </>

    );
};

export default ParamsForm;

