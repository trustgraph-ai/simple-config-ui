
import React from 'react';

import { Gavel } from '@mui/icons-material';

import DeploymentSection from './DeploymentSection';
import DeploymentStep from './DeploymentStep';
import DeploymentQuote from './DeploymentQuote';

const FalkorDb: React.FC<{}> = () => {
    return (
        <DeploymentSection
            avatar={<Gavel color="primary" fontSize="large"/>}
            title="FalkorDB graph store">

            <DeploymentStep>
                FalkorDB is licensed under
                the <a href="https://github.com/FalkorDB/FalkorDB/blob/master/LICENSE.txt">
                    Server Side Public License (SSPLv1)
                </a>.
            </DeploymentStep>

            <DeploymentQuote>
                "The Server Side Public License (SSPLv1) is designed to
                ensure that if you use FalkorDB as part of a service you
                make available to others (e.g., in the cloud or as an
                API), you are required to make the source code of your
                complete service available under the SSPLv1 license. This
                is similar to GPL but extends to server use."
            </DeploymentQuote>

        </DeploymentSection>
    );
};

export default FalkorDb;

