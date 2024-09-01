import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface GraphStoreProps {
  value: string;
  onChange: (value: string) => void;
}

const GraphStore: React.FC<GraphStoreProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Graph Store</InputLabel>
      <Select
        value={value}
        label="Graph Store"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="cassandra">Cassandra</MenuItem>
        <MenuItem value="neo4j">Neo4j</MenuItem>
      </Select>
    </FormControl>
  );
};

export default GraphStore;

