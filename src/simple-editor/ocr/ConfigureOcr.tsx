
import React from 'react';

import {
    Typography, Box, Stack, FormControl, FormControlLabel, FormLabel,
    RadioGroup, Radio,
} from '@mui/material';

import PromptControls from './PromptControls';
import PromptEditor from './PromptEditor';
import { usePromptsStore } from '../state/Prompts';

const ConfigureOcr = ({
}) => {

    return (<>

<Box>
        <Typography variant="h5" component="h2" gutterBottom>
            Configure OCR
        </Typography>

        <FormControl>

          <FormLabel id="pdf-processing-mode-label">
              PDF processing mode
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="pdf-processing-mode-label"
            defaultValue="pdf-decode"
            name="pdf-processing-mode-group"
          >

            <FormControlLabel
                value="pdf-decode" control={<Radio />}
                label="PDF decode mode: PDF documents are decoded, and text is extracted.  No OCR is performed."
            />

            <FormControlLabel
                value="pdf-ocr-tesseract" control={<Radio />}
                label="OCR processing with Tesseract.  Tesseract is a free, embedded OCR engine.  It is best-in-class free / open-source."
            />

            <FormControlLabel
                value="pdf-ocr-mistral" control={<Radio />}
                label="OCR processing with the Mistral service.  Mistral is the best-in-class commercial OCR service."
            />

          </RadioGroup>

        </FormControl>
</Box>
    </>);
};

export default ConfigureOcr;

