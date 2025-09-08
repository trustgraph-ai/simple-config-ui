
import { ConfigurationState, ModelParams } from './state/Configuration';
import { Version } from './state/Version';

import {
    Options,
    CONFIGURE_EMBEDDINGS, CONFIGURE_OCR,
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
    template : Version,
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
    ];

    // Add object store component only for version 1.3+
    const versionParts = template.version.split('.');
    const majorVersion = parseInt(versionParts[0]) || 0;
    const minorVersion = parseInt(versionParts[1]) || 0;
    if (majorVersion > 1 || (majorVersion === 1 && minorVersion >= 3)) {
        components.push({
            "name": "object-store-" + config.objectStore,
            "parameters": {}
        });
    }

    components.push(
        {
            "name": "grafana",
            "parameters": {}
        },
        {
            "name": "trustgraph-base",
            "parameters": {}
        }
    );

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
                "name": "mistral-ocr",
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

    // Removed workbench-ui and document-rag as they are no-ops

    components.push({
        "name": "null",
        "parameters": parameters,
    });

    const componentsEnc = JSON.stringify(components, null, 4)

    return fetch(
        "/api/generate/" + config.platform + "/" + template.template, {
            body: componentsEnc,
            method: "POST",
            headers: {
            }
         }
    );

};

