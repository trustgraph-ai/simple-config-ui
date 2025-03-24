
import React from 'react';

import { Typography } from '@mui/material';
import { Insights } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const DocumentRag: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Insights color="primary" fontSize="large"/>}
            title="Document RAG">

            <DeploymentStep>
                Document RAG APIs are separate from GraphRAG.
                You can use the `tg-invoke-document-rag` to test
                Document RAG processing once documents are loaded:
            </DeploymentStep>

            <DeploymentCode>
                tg-invoke-document-rag -q "Describe a cat"
            </DeploymentCode>

        </DeploymentSection>

    );

};

export default DocumentRag;

