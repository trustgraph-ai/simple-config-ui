
import { ConfigurationState, ModelParams } from './state/Configuration';
import { Version } from './state/Version';

import {
    Options,
    CONFIGURE_EMBEDDINGS, CONFIGURE_OCR,
} from './state/Options';

const isVersion14OrHigher = (template : Version) => {
    const versionParts = template.version.split('.');
    const majorVersion = parseInt(versionParts[0]) || 0;
    const minorVersion = parseInt(versionParts[1]) || 0;
    return majorVersion > 1 || (majorVersion === 1 && minorVersion >= 4);
};

const isVersion13OrHigher = (template : Version) => {
    const versionParts = template.version.split('.');
    const majorVersion = parseInt(versionParts[0]) || 0;
    const minorVersion = parseInt(versionParts[1]) || 0;
    return majorVersion > 1 || (majorVersion === 1 && minorVersion >= 3);
};

const isVersion15OrHigher = (template : Version) => {
    const versionParts = template.version.split('.');
    const majorVersion = parseInt(versionParts[0]) || 0;
    const minorVersion = parseInt(versionParts[1]) || 0;
    return majorVersion > 1 || (majorVersion === 1 && minorVersion >= 5);
};

const modelConfig = (m : ModelParams, template : Version) => {
    if (isVersion14OrHigher(template)) {
        // For v1.4+, only include max-output-tokens
        return {
            "max-output-tokens": m.maxOutputTokens,
        };
    }

    // For versions < 1.4, include all parameters
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
    if (isVersion13OrHigher(template)) {
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

    // For versions < 1.4, add chunker configuration
    if (!isVersion14OrHigher(template)) {
        if (config.chunkerType == "chunker-recursive") {
            components.push({
                "name": "override-recursive-chunker",
                "parameters": {}
            });
        }
    }

    if (options.options.has(CONFIGURE_EMBEDDINGS)) {

        if (config.embeddingsEngine == "fastembed")
            components.push({
                "name": "embeddings-fastembed",
                "parameters": isVersion15OrHigher(template) ? {} : {
                    "embeddings-model": config.embeddingsModel,
                }
            });
        else
            components.push({
                "name": "embeddings-hf",
                "parameters": isVersion15OrHigher(template) ? {} : {
                    "embeddings-model": config.embeddingsModel,
                }
            });

    } else {
        components.push({
            "name": "embeddings-fastembed",
            "parameters": isVersion15OrHigher(template) ? {} : {
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
        parameters: modelConfig(config.mainModel, template)
    });

    // For v1.4+, don't add the -rag component at all
    if (!isVersion14OrHigher(template)) {
        if (config.dualModelMode) {
            components.push({
                name: config.ragModel.deployment + "-rag",
                parameters: modelConfig(config.ragModel, template)
            });
        } else {
            components.push({
                name: config.mainModel.deployment + "-rag",
                parameters: modelConfig(config.mainModel, template)
            });
        }
    }

    let parameters : { [k : string] : string | number } = {};

    // For versions < 1.4, add chunk parameters
    if (!isVersion14OrHigher(template)) {
        parameters["chunk-size"] = config.chunkSize;
        parameters["chunk-overlap"] = config.chunkOverlap;
    }

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

