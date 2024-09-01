import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface ModelDeploymentProps {
  value: string;
  onChange: (value: string) => void;
}

const ModelDeployment: React.FC<ModelDeploymentProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Model Deployment</InputLabel>
      <Select
        value={value}
        label="Model Deployment"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="anthropic">Anthropic</MenuItem>
        <MenuItem value="bedrock">AWS Bedrock</MenuItem>
        <MenuItem value="azure">Azure</MenuItem>
        <MenuItem value="cohere">Cohere</MenuItem>
        <MenuItem value="ollama">Ollama</MenuItem>
        <MenuItem value="openai">OpenAI</MenuItem>
        <MenuItem value="vertexai">VertexAI</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ModelDeployment;