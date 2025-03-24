
import { ConfigurationState, ModelParams } from './state/Configuration';
import { Prompts } from './state/Prompts';
import { Agents } from './state/Agents';
import {
    Options, CONFIGURE_PROMPTS, CONFIGURE_AGENTS, CONFIGURE_WORKBENCH,
    CONFIGURE_DOCUMENT_RAG, CONFIGURE_EMBEDDINGS, CONFIGURE_OCR,
} from './state/Options';

const modelConfig = (m : ModelParams) => {
    return {
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
            "name": "triple-store-" + config.graphStore,
            "parameters": {}
        },
        {
            "name": "pulsar",
            "parameters": {}
        },
        {
            "name": "vector-store-" + config.vectorDB,
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
            "name": "trustgraph-base",
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

    if (options.options.has(CONFIGURE_EMBEDDINGS)) {

        if (config.embeddingsEngine == "fastembed") 
            components.push({
                "name": "embeddings-fastembed",
                "parameters": {
                    "embeddings-model": config.embeddingsModel,
                }
            });
        else
            components.push({
                "name": "embeddings-hf",
                "parameters": {
                    "embeddings-model": config.embeddingsModel,
                }
            });
          
    } else {
        components.push({
            "name": "embeddings-fastembed",
            "parameters": {
                "embeddings-model": "sentence-transformers/all-MiniLM-L6-v2",
            }
        });
    }

    if (options.options.has(CONFIGURE_OCR)) {

        if (config.ocrEngine == "pdf-ocr") 
            components.push({
                "name": "ocr",
                "parameters": {
                }
            });
        else if (config.ocrEngine == "pdf-ocr-mistral") 
            components.push({
                "name": "ocr-mistral",
                "parameters": {
                }
            });

    }

    components.push({
        name: config.mainModel.deployment,
        parameters: modelConfig(config.mainModel)
    });

    if (config.dualModelMode) {
        components.push({
            name: config.ragModel.deployment + "-rag",
            parameters: modelConfig(config.ragModel)
        });
    } else {
        components.push({
            name: config.mainModel.deployment + "-rag",
            parameters: modelConfig(config.mainModel)
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
          
    } else {

        components.push({
            "name": "agent-manager-react",
            "parameters": {
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

    if (options.options.has(CONFIGURE_DOCUMENT_RAG)) {

        components.push({
            "name": "document-rag",
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

