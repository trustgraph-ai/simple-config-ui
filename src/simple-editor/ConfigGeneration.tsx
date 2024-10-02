
import { Plumbing } from '@mui/icons-material';

import {
    Button, Typography, Card, CardContent, CardActions, CardHeader,
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

//    const setDeploymentConfig
//        = useModelParamsStore((state) => state.setDeploymentConfig);

    const setConfigUrl
        = useModelParamsStore((state) => state.setConfigUrl);

    const generate = () => {

      generateConfig(
          graphStore, modelDeployment, vectorDB, chunkSize, chunkOverlap,
          maxOutputTokens, modelName, chunkerType, temperature,
      ).then(
          response => {
              if (response.ok) {
                  return response.blob();
              } else {
                  throw response.statusText;
              }
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
                <CardHeader
                    avatar={<Plumbing color="primary" fontSize="large"/>}
                    title="Deployment configuration"
                />
                <CardContent>
                    <Typography variant="body2">
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

