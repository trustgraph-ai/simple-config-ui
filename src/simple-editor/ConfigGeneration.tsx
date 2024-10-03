
import {
    Button, Typography, Card, CardContent, CardActions
} from '@mui/material';

import { generateConfig } from './generate-config';
import { useModelParamsStore } from './state/ModelParams';

const ConfigGeneration = () => {

    const graphStore
        = useModelParamsStore((state) => state.graphStore);
    const vectorDB
        = useModelParamsStore((state) => state.vectorDB);
    const chunkerType
        = useModelParamsStore((state) => state.chunkerType);
    const chunkSize
        = useModelParamsStore((state) => state.chunkSize);
    const chunkOverlap
        = useModelParamsStore((state) => state.chunkOverlap);
    const modelDeployment
        = useModelParamsStore((state) => state.modelDeployment);
    const modelName
        = useModelParamsStore((state) => state.modelName);
    const temperature
        = useModelParamsStore((state) => state.temperature);
    const maxOutputTokens
        = useModelParamsStore((state) => state.maxOutputTokens);

    const setDeploymentConfig
        = useModelParamsStore((state) => state.setDeploymentConfig);
    const setConfigUrl
        = useModelParamsStore((state) => state.setConfigUrl);

    const generate = () => {

      generateConfig(
          graphStore, modelDeployment, vectorDB, chunkSize, chunkOverlap,
          maxOutputTokens, modelName, chunkerType, temperature,
      ).then(
          response => {
              if (response.ok) {
                  return response.text();
              } else {
                  throw response.statusText;
              }
          }
      ).then(
          cfg => {
              setDeploymentConfig(cfg);
              return new Blob([cfg]);
          }
      ).then(
            blob => {
                if (blob) {
                    var url = window.URL.createObjectURL(blob);
                    setConfigUrl(url);
                }
            }
        );

    }

    return (
        <>
            <Card sx={{ minWidth: 275, mt: 4 }}>
                <CardContent>
                  <Typography component="div" sx={{ fontSize: 16 }}>
                        2. Deployment configuration
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 2}}>
                        When you have selected the configuration parameters
                        you need, select to generate the configuration
                        package.  This will make it available to download.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => generate()}>Generate</Button>
                </CardActions>
            </Card>
        </>
    );
}

export default ConfigGeneration;

