import React from 'react';

import {
    FormControl, InputLabel, Select, MenuItem, Box, Stack, Divider,
    Typography,
} from '@mui/material';

interface PlatformProps {
    value : string;
    onChange: (value: string) => void;
}

const Platform: React.FC<PlatformProps> = ({
    value, onChange
}) => {

  return (

        <FormControl fullWidth>

            <InputLabel id="graph-store-label">Platform</InputLabel>

            <Select
                labelId="platform-label"
                id="platform-select"
                value={value}
                label="Platform"
                onChange={(e) => onChange(e.target.value)}
                sx={{minHeight: 120}}
            >

                <MenuItem value="docker-compose">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack
                            sx={{
                                width: 140, whiteSpace: 'wrap',
                                textAlign: 'center',
                            }}
                            direction="column"
                            alignItems="center" justifyContent="center"
                        >
                            <img src="https://calazanblog-assets.s3.amazonaws.com/media/editor-uploads/docker02.png" width="110"/>
                        </Stack>

                        <Box sx={{
                            width: '38rem'
                        }}>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >
                                Docker Compose is a tool for defining
                                and running multi-container
                                applications inside Docker.  It is easy to
                                install and launch on MacOS and Linux systems,
                                and provides an easy way to try out a
                                multi-container deployment to evaluate
                                and learn.
                            </Typography>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap', mt: 1 }}
                            >
                                Docker Compose may not be well suited
                                to production deployments.
                            </Typography>
                        </Box>
                    </Stack>
                </MenuItem>
                
                <MenuItem value="podman-compose">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack
                            sx={{
                                width: 140, whiteSpace: 'wrap',
                                textAlign: 'center',
                            }}
                            direction="column"
                            alignItems="center" justifyContent="center"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Podman-logo-orig.png" width="110"/>
                        </Stack>

                        <Box sx={{
                            width: '38rem'
                        }}>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >
                                Podman Compose is a tool for defining
                                and running multi-container
                                applications inside Linux containers.  It
                                is feature-compatible with Docker Compose,
                                and is a default deployment option for
                                most Linux systems.
                            </Typography>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap', mt: 1 }}
                            >
                                Podman Compose may not be well suited
                                to production deployments.
                            </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

                <MenuItem value="minikube-k8s">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack
                            sx={{
                                width: 140, whiteSpace: 'wrap',
                                textAlign: 'center',
                            }}
                            direction="column"
                            alignItems="center" justifyContent="center"
                        >

<img src="https://hashiqube.com/minikube/images/minikube-logo.png" width="110"/>

                        </Stack>

                        <Box sx={{
                            width: '38rem'
                        }}>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >
                                Minikube is a simple stand-alone Kubernetes
                                suitable for small-to-medium deployments.
                                It is a good way to learn about Kubernetes if
                                you are not familiar with it.
                            </Typography>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap', mt: 1 }}
                            >
                                It has limitations
                                (single node cluster, simple networking models)
                                that would limit its use for scale or
                                production use.
                            </Typography>
                        </Box>
                    </Stack>
                </MenuItem>

                <MenuItem value="gcp-k8s">
                    <Stack
                        direction="row" spacing={2}
                        divider={
                            <Divider orientation="vertical" flexItem />
                        }
                        alignItems="stretch"
                    >
                        <Stack
                            sx={{
                                width: 140, whiteSpace: 'wrap',
                                textAlign: 'center',
                            }}
                            direction="column"
                            alignItems="center" justifyContent="center"
                        >
                            <img src="https://www.logo.wine/a/logo/Google_Cloud_Platform/Google_Cloud_Platform-Logo.wine.svg" width="135"/>
                        </Stack>

                        <Box sx={{
                            width: '38rem'
                        }}>

                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap' }}
                            >
                                Kubernetes Engine (GKE) is a managed
                                Kubernetes service that allows users to deploy
                                and manage containerized applications using
                                Google's infrastructure.
                            </Typography>
                            <Typography variant="body2"
                                sx={{ whiteSpace: 'wrap', mt: 1 }}
                            >
                                GKE is suitable for production deployment
                                and has all the observability and scalability
                                features needed to build a scalable
                                application.
                            </Typography>

                        </Box>
                    </Stack>
                </MenuItem>

            </Select>
        </FormControl>

  );
};

export default Platform;

