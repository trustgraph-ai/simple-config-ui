
import React from 'react';

import { useModelParamsStore } from './state/ModelParams';

import ConfigGeneration from './ConfigGeneration';
import PreparedConfig from './PreparedConfig';

interface DeploymentConfigProps {
}

const DeploymentConfig: React.FC<DeploymentConfigProps> = ({
}) => {

    const configUrl
        = useModelParamsStore((state) => state.configUrl);

    if (configUrl) {
        return <PreparedConfig/>;
    } else {
        return <ConfigGeneration/>;
    }

};

export default DeploymentConfig;

