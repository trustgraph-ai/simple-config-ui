
import React from 'react';

import { Typography } from '@mui/material';
import { Insights } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentEnvVars from './DeploymentEnvVars';
import DeploymentStep from './DeploymentStep';
import DeploymentCode from './DeploymentCode';

const Workbench: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Insights color="primary" fontSize="large"/>}
            title="Demo Workbench">

                <DeploymentStep>
                    Once the system is running, you can access the
                    Demo Workbench on port 8888, or access using the
                    following URL:
                </DeploymentStep>

                <DeploymentCode>
                    <a href="http://localhost:8888">
                        http://localhost:8888/
                    </a>
                </DeploymentCode>

                <DeploymentStep>
                    Once you have data loaded, you can present a
                    Graph RAG query on the Chat tab.  As well as
                    answering the question, a list of semantic relationships
                    which were used to answer the question are shown
                    and these can be used to navigate the knowledge
                    graph.
                </DeploymentStep>

        </DeploymentSection>

    );

};

export default Workbench;

