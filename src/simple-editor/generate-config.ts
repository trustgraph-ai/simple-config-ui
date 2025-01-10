
import { ConfigurationState, ModelParms } from './state/Configuration';
import { Prompts } from './state/Prompts';
import { Agents } from './state/Agents';
import {
    Options, CONFIGURE_PROMPTS, CONFIGURE_AGENTS, CONFIGURE_WORKBENCH,
} from './state/Options';

const modelConfig = (m : ModelParams) => {
    return {
        deployment: m.deployment,
        temperature: m.temperature,
        "max-output-tokens": m.maxOutputTokens,
        model: m.modelName,
    };
}

export const generateConfig =
(
    config : ConfigurationState,
    prompts : Prompts,
    agents : Agents,
    options : Options,
) => {

    let components = [
        {
            "name": config.graphStore,
            "parameters": {}
        },
        {
            "name": "pulsar",
            "parameters": {}
        },
        {
            "name": config.vectorDB,
            "parameters": {}
        },
        {
            "name": "embeddings-hf",
            "parameters": {}
        },
        {
            "name": "graph-rag",
            "parameters": {}
        },
        {
            "name": "grafana",
            "parameters": {}
        },
        {
            "name": "trustgraph",
            "parameters": {}
        },
        {
            "name": "prompt-template",
            "parameters": {}
        },
    ];

    // Will collate some various parameters to apply to the config.
    // These get put into the 'null' pattern.

    if (config.chunkerType == "chunker-recursive") {
        components.push({
            "name": "override-recursive-chunker",
            "parameters": {}
        });
    }

    components.push({
        name: "llm",
        parameters: modelConfig(config.mainModel)
    });

    if (config.dualModelMode) {
        components.push({
            name: "llm-rag",
            parameters: modelConfig(config.ragModel)
        });
    }

    let parameters : { [k : string] : string | number } = {};

    parameters["chunk-size"] = config.chunkSize;
    parameters["chunk-overlap"] = config.chunkOverlap;

    if (options.options.has(CONFIGURE_PROMPTS)) {

        let promptParams = prompts.prompts.reduce(
            (obj, elt) => ({ ...obj, [elt.id]: elt.prompt }), {}
        );
  
        components.push({
            "name": "prompt-overrides",
            "parameters": promptParams,
        });
          
    }

    if (options.options.has(CONFIGURE_AGENTS)) {

        let toolParams = agents.tools;
  
        components.push({
            "name": "agent-manager-react",
            "parameters": {
                "tools": toolParams
            },
        });
          
    }

    if (options.options.has(CONFIGURE_WORKBENCH)) {

        components.push({
            "name": "workbench-ui",
            "parameters": {
            },
        });

    }

    components.push({
        "name": "null",
        "parameters": parameters,
    });

    const componentsEnc = JSON.stringify(components, null, 4)

    const platform = config.platform;
    const version = config.trustgraphVersion;

    return fetch(
        "/api/generate/" + platform + "/" + version, {
            body: componentsEnc,
            method: "POST",
            headers: {
            }
         }
    );

};

