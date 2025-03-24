import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { useConfigurationStateStore } from '../state/Configuration';
import {
    useOptionsStore, CONFIGURE_DOCUMENT_RAG, CONFIGURE_WORKBENCH,
} from '../state/Options';

import DockerCompose from './DockerCompose';
import PodmanCompose from './PodmanCompose';
import Minikube from './Minikube';
import Gke from './Gke';
import Eks from './Eks';
import Aks from './Aks';

import AzureCompose from './AzureCompose';
import AzureOpenaiCompose from './AzureOpenaiCompose';
import BedrockCompose from './BedrockCompose';
import ClaudeCompose from './ClaudeCompose';
import CohereCompose from './CohereCompose';
import GoogleAiStudioCompose from './GoogleAiStudioCompose';
import LlamafileCompose from './LlamafileCompose';
import LmstudioCompose from './LmstudioCompose';
import MistralCompose from './MistralCompose';
import OllamaCompose from './OllamaCompose';
import OpenaiCompose from './OpenaiCompose';
import VertexAiCompose from './VertexAiCompose';

import AzureKube from './AzureKube';
import AzureOpenaiKube from './AzureOpenaiKube';
import BedrockKube from './BedrockKube';
import ClaudeKube from './ClaudeKube';
import CohereKube from './CohereKube';
import GoogleAiStudioKube from './GoogleAiStudioKube';
import LlamafileKube from './LlamafileKube';
import LmstudioKube from './LmstudioKube';
import MistralKube from './MistralKube';
import OllamaKube from './OllamaKube';
import OpenaiKube from './OpenaiKube';
import VertexAiKube from './VertexAiKube';

import PineconeCompose from './PineconeCompose';
import PineconeKube from './PineconeKube';

import FalkorDb from './FalkorDb';

import GatewayKube from './GatewayKube';

import Workbench from './Workbench';
import NoWorkbench from './NoWorkbench';

import ApplicationCompose from './ApplicationCompose';
import ApplicationKube from './ApplicationKube';

import DeploymentPlatform from './DeploymentPlatform';
import DeploymentModel from './DeploymentModel';
import DeploymentConfig from './DeploymentConfig';
import DeploymentInstructions from './DeploymentInstructions';
import DeploymentVectorStore from './DeploymentVectorStore';
import DeploymentGraphStore from './DeploymentGraphStore';
import DeploymentWorkbench from './DeploymentWorkbench';
import DeploymentGateway from './DeploymentGateway';
import DeploymentDocumentRag from './DeploymentDocumentRag';

interface DeploymentProps {
}

const getPlatformProcedure = (platform : string) => {

    const platforms = {
        "docker-compose": <DockerCompose/>,
        "podman-compose": <PodmanCompose/>,
        "minikube-k8s": <Minikube/>,
        "gcp-k8s": <Gke/>,
        "eks-k8s": <Eks/>,
        "aks-k8s": <Aks/>,
    };

    if (platform in platforms) return platforms[platform];

    return null;

}

const Deployment: React.FC<DeploymentProps> = ({
}) => {

    const config = useConfigurationStateStore((state) => state);

    const options = useOptionsStore((state) => state.options);

    const dualModelMode = useConfigurationStateStore(
        (state) => state.dualModelMode
    );

    let deploymentProcedures = [];

    deploymentProcedures.push(<DeploymentConfig/>);
    deploymentProcedures.push(getPlatformProcedure(config.platform));

    let models : string[] = [];
    if (dualModelMode)
        models = [ config.mainModel.deployment, config.ragModel.deployment ];
    else
        models = [config.mainModel.deployment];

    if (config.platform == "docker-compose" ||
        config.platform == "podman-compose") {

        // Compose platforms

        if (models.includes("azure"))
            deploymentProcedures.push(<AzureCompose/>);
        if (models.includes("azure-openai"))
            deploymentProcedures.push(<AzureOpenaiCompose/>);
        if (models.includes("bedrock"))
            deploymentProcedures.push(<BedrockCompose/>);
        if (models.includes("claude"))
            deploymentProcedures.push(<ClaudeCompose/>);
        if (models.includes("cohere"))
            deploymentProcedures.push(<CohereCompose/>);
        if (models.includes("googleaistudio"))
            deploymentProcedures.push(<GoogleAiStudioCompose/>);
        if (models.includes("llamafile"))
            deploymentProcedures.push(<LlamafileCompose/>);
        if (models.includes("lmstudio"))
            deploymentProcedures.push(<LmstudioCompose/>);
        if (models.includes("mistral"))
            deploymentProcedures.push(<MistralCompose/>);
        if (models.includes("ollama"))
            deploymentProcedures.push(<OllamaCompose/>);
        if (models.includes("openai"))
            deploymentProcedures.push(<OpenaiCompose/>);
        if (models.includes("vertexai"))
            deploymentProcedures.push(<VertexAiCompose/>);

        if (config.vectorDB == "pinecone")
            deploymentProcedures.push(<PineconeCompose/>);

    } else {

        // Kubernetes platforms

        if (models.includes("azure"))
            deploymentProcedures.push(<AzureKube/>);
        if (models.includes("azure-openai"))
            deploymentProcedures.push(<AzureOpenaiKube/>);
        if (models.includes("bedrock"))
            deploymentProcedures.push(<BedrockKube/>);
        if (models.includes("claude"))
            deploymentProcedures.push(<ClaudeKube/>);
        if (models.includes("cohere"))
            deploymentProcedures.push(<CohereKube/>);
        if (models.includes("googleaistudio"))
            deploymentProcedures.push(<GoogleAiStudioKube/>);
        if (models.includes("llamafile"))
            deploymentProcedures.push(<LlamafileKube/>);
        if (models.includes("lmstudio"))
            deploymentProcedures.push(<LmstudioKube/>);
        if (models.includes("mistral"))
            deploymentProcedures.push(<MistralKube/>);
        if (models.includes("ollama"))
            deploymentProcedures.push(<OllamaKube/>);
        if (models.includes("openai"))
            deploymentProcedures.push(<OpenaiKube/>);
        if (models.includes("vertexai"))
            deploymentProcedures.push(<VertexAiKube/>);

        if (config.vectorDB == "pinecone")
            deploymentProcedures.push(<PineconeKube/>);

        deploymentProcedures.push(<GatewayKube/>);

    }

    if (config.graphStore == "falkordb")
        deploymentProcedures.push(<FalkorDb/>);

    if (options.has(CONFIGURE_WORKBENCH))
        deploymentProcedures.push(<Workbench/>);
    else
        deploymentProcedures.push(<NoWorkbench/>);

    if (config.platform == "docker-compose" ||
        config.platform == "podman-compose")
        deploymentProcedures.push(<ApplicationCompose/>);
    else
        deploymentProcedures.push(<ApplicationKube/>);

    return (
        <Box className="deployment">
        {
            deploymentProcedures.map((c, ix) => <Box key={ix}>{c}</Box>)
        }
        </Box>
    );
    
/*
    return (
        <>
            <Box className="deployment">

                {
                    options.has(CONFIGURE_DOCUMENT_RAG) && (
                        <Box>
                            <DeploymentDocumentRag/>
                        </Box>
                    )
                }

                <Box>
                    <DeploymentInstructions/>
                </Box>

            </Box>
        </>
    );
*/
};

export default Deployment;
