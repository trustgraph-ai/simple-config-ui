
import { useEffect } from 'react';
import { Box, Radio } from '@mui/material';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import { useConfigurationStateStore } from '../state/Configuration';

const ConfigureOcr = ({
}) => {

    const ocrEngine = useConfigurationStateStore((state) => state.ocrEngine);
        
    const setOcrEngine = useConfigurationStateStore(
        (state) => state.setOcrEngine
    );

    useEffect(() => {
        if ((ocrEngine != "pdf-decode") && 
            (ocrEngine != "pdf-ocr") &&
            (ocrEngine != "pdf-ocr-mistral")) {
            setOcrEngine("pdf-decode");
        }
    });

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
                      checked={ocrEngine === 'pdf-decode'}
                      onChange={x => setOcrEngine(x.target.value)}
                      value="pdf-decode"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    />
                </Grid>
                <Grid size={10}>
                    PDF decode: this is the default
                    configuration.  Extracts text
                    from PDF documents containing structured text, but
                    does not perform OCR on images or scanned documents.
                </Grid>

                <Grid
                    size={2} display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-start"
                >
                    <Radio
                      checked={ocrEngine === 'pdf-ocr'}
                      onChange={x => setOcrEngine(x.target.value)}
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
                      checked={ocrEngine === 'pdf-ocr-mistral'}
                      onChange={x => setOcrEngine(x.target.value)}
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

