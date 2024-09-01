import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

interface ChunkerProps {
  type: string;
  chunkSize: number;
  chunkOverlap: number;
  onTypeChange: (value: string) => void;
  onChunkSizeChange: (value: number) => void;
  onChunkOverlapChange: (value: number) => void;
}

const Chunker: React.FC<ChunkerProps> = ({
  type,
  chunkSize,
  chunkOverlap,
  onTypeChange,
  onChunkSizeChange,
  onChunkOverlapChange,
}) => {
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Chunker Type</InputLabel>
        <Select
          value={type}
          label="Chunker Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="chunker-recursive">Recursive</MenuItem>
          <MenuItem value="chunker-token">Token</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Chunk Size"
        type="number"
        value={chunkSize}
        onChange={(e) => onChunkSizeChange(parseInt(e.target.value))}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Chunk Overlap"
        type="number"
        value={chunkOverlap}
        onChange={(e) => onChunkOverlapChange(parseInt(e.target.value))}
        margin="normal"
      />
    </div>
  );
};

export default Chunker;

