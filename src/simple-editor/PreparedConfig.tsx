
import { Plumbing } from '@mui/icons-material';

import {
    Button, Typography, Card, CardContent, CardActions, CardHeader
} from '@mui/material';

import { useModelParamsStore } from './state/ModelParams';

const PreparedConfig = () => {

    const graphStore
        = useModelParamsStore((state) => state.graphStore);
    const vectorDB
        = useModelParamsStore((state) => state.vectorDB);
    const modelDeployment
        = useModelParamsStore((state) => state.modelDeployment);
    const modelName
        = useModelParamsStore((state) => state.modelName);

    const configUrl
        = useModelParamsStore((state) => state.configUrl);

    const download = () => {

    if (!configUrl) return;
        let alink = document.createElement("a");
        alink.href = configUrl;
        alink.download = "deploy.zip";
        alink.click();
    };

    return (
        <>

            <Card sx={{ minWidth: 275, mt: 4 }}>
                <CardHeader
                    avatar={<Plumbing color="primary" fontSize="large"/>}
                    title="Deployment configuration"
                />
                <CardContent>
                  <Typography component="div" sx={{ fontSize: 16 }}>
                        2. Deployment configuration
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, mb: 2}}>
                        Config has been generated for:
                        <ul>
                            <li>Model deployment: {modelDeployment}</li>
                            <li>Model name: {modelName}</li>
                            <li>Graph store: {graphStore}</li>
                            <li>Vector DB: {vectorDB}</li>
                        </ul>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => download()}>
                        Download
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default PreparedConfig;

