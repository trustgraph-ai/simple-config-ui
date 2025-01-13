import React from 'react';
import {
    FormControl, InputLabel, Select, MenuItem, TextField, Slider
} from '@mui/material';

import modelsRaw from './models.json';
const models = modelsRaw as { [ix : string ] : string[] };
import { ModelParams } from '../state/Configuration';

interface ModelParametersProps {
    value : ModelParams;
    onChange : (m : ModelParams) => void;
}

const ModelParameters: React.FC<ModelParametersProps> = ({
    value, onChange,
}) => {

    const availModels = models[value.deployment];

console.log(value);


    const ModelList : React.FC<{
        value : string;
        modelList : string[];
        onChange : (value: string) => void;
    }> = ({ value, modelList, onChange}) => {

if (!modelList) {
return <div>BROKEN</div>;

}
        const readOnly = (modelList.length == 0);

        if (modelList.length == 0) {

            return (
                <FormControl fullWidth disabled>

                    <InputLabel id="model-name-label">Model</InputLabel>

                    <Select
                        labelId="model-name-label"
                        id="model-name-select"
                        value="n/a"
                        label="Model"
                    >
                        <MenuItem key="n/a" value="n/a">n/a</MenuItem>
                    </Select>
                </FormControl>
            );

        }

        return (
            <FormControl fullWidth>

                <InputLabel id="model-name-label">Model</InputLabel>

                <Select
                    labelId="model-name-label"
                    id="model-name-select"
                    value={value}
                    label="Model"
                    onChange={(e) => onChange(e.target.value)}
                    inputProps={{ readOnly: readOnly }}
                >
                    {
                        modelList.map(
                            (v) => (
                                <MenuItem key={v}
                                    value={v}>
                                    {v}
                                </MenuItem>
                            ))
                    }
                </Select>

            </FormControl>

        );
    }

    return (
        <div>

            <ModelList
                value={value.modelName} modelList={availModels}
                onChange={
                    (m : string) => onChange({
                        ...value,
                        modelName: m
                    })
                }
            />

            <div>
                <p>Temperature: {value.temperature}</p>
                <Slider
                    value={value.temperature}
                    onChange={
                        (_, temp) => onChange({
                            ...value,
                            temperature: (temp as number),
                        })
                    }
                    min={0}
                    max={2}
                    step={0.01}
                />
            </div>
            <TextField
                fullWidth
                label="Max output tokens"
                type="number"
                value={value.maxOutputTokens}
                onChange={
                    (e) => onChange({
                        ...value,
                        maxOutputTokens: parseInt(e.target.value),
                    })
                }
                margin="normal"
            />
        </div>
    );
};

export default ModelParameters;

