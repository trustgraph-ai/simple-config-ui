import React from 'react';
import { TextField, Slider } from '@mui/material';

interface ModelParametersProps {
  modelName: string;
  temperature: number;
  maxOutputTokens: number;
  onModelNameChange: (value: string) => void;
  onTemperatureChange: (value: number) => void;
  onMaxOutputTokensChange: (value: number) => void;
}

const ModelParameters: React.FC<ModelParametersProps> = ({
  modelName,
  temperature,
  maxOutputTokens,
  onModelNameChange,
  onTemperatureChange,
  onMaxOutputTokensChange,
}) => {
  return (
    <div>
      <TextField
        fullWidth
        label="Model Name"
        value={modelName}
        onChange={(e) => onModelNameChange(e.target.value)}
        margin="normal"
      />
      <div>
        <p>Temperature: {temperature}</p>
        <Slider
          value={temperature}
          onChange={(_, value) => onTemperatureChange(value as number)}
          min={0}
          max={1}
          step={0.1}
        />
      </div>
      <TextField
        fullWidth
        label="Max Output Tokens"
        type="number"
        value={maxOutputTokens}
        onChange={(e) => onMaxOutputTokensChange(parseInt(e.target.value))}
        margin="normal"
      />
    </div>
  );
};

export default ModelParameters;