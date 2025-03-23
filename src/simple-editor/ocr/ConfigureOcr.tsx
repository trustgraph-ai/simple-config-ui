
import React from 'react';

import {
    Typography, Box, Stack, FormControl, FormControlLabel, FormLabel,
    RadioGroup, Radio,
} from '@mui/material';

import Grid from '@mui/material/Grid2';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import LaptopIcon from '@mui/icons-material/Laptop';
import TvIcon from '@mui/icons-material/Tv';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import PromptControls from './PromptControls';
import PromptEditor from './PromptEditor';
import { usePromptsStore } from '../state/Prompts';

const ConfigureOcr = ({
}) => {

  const [selectedValue, setSelectedValue] = React.useState('pdf-decode');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };


    return (<>

        <Box sx={{width: "45rem"}}>

            <Typography variant="h5" component="h2" gutterBottom>
                Configure OCR
            </Typography>

            <Grid container spacing={2} sx={{ m: 3 }}>

                <Grid
                    size={2} display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <Radio
                      checked={selectedValue === 'pdf-decode'}
                      onChange={handleChange}
                      value="pdf-decode"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                </Grid>
                <Grid size={10}>
                    PDF decode, no OCR: the basic decode extracts text
                    from PDF documents containing structured text
                </Grid>

                <Grid
                    size={2} display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <Radio
                      checked={selectedValue === 'pdf-ocr'}
                      onChange={handleChange}
                      value="pdf-ocr"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                </Grid>
                <Grid size={10}>
                    OCR processing with Tesseract.  Tesseract is a free,
                    embedded OCR engine.  It is best-in-class free /
                    open-source.  Use this with PDF documents containing
                    image scans, to perform Optical Character Recognition
                    to detect text.
                </Grid>

                <Grid
                    size={2} display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <Radio
                      checked={selectedValue === 'pdf-ocr-mistral'}
                      onChange={handleChange}
                      value="pdf-ocr-mistral"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                </Grid>
                <Grid size={10}>
                    OCR processing with the Mistral service.  Mistral is the
                    best-in-class commercial OCR service.  You need a
                    Mistral subscription.  Use this with PDF documents
                    containing image scans, to perform Optical Character
                    Recognition to detect text.
                </Grid>

            </Grid>

        </Box>

    </>);

};

export default ConfigureOcr;

