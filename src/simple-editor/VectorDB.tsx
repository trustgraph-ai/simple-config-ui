import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface VectorDBProps {
  value: string;
  onChange: (value: string) => void;
}

const VectorDB: React.FC<VectorDBProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Vector DB</InputLabel>
      <Select
        value={value}
        label="Vector DB"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="qdrant">Qdrant</MenuItem>
        <MenuItem value="milvus">Milvus</MenuItem>
      </Select>
    </FormControl>
  );
};

export default VectorDB;