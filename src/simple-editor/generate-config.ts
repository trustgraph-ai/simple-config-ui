
import { ModelParams } from './state/ModelParams';
import { Prompts } from './state/Prompts';
import { Options, CONFIGURE_PROMPTS } from './state/Options';

export const generateConfig =
(
    params : ModelParams, prompts : Prompts, options : Options,
) => {

    const depl = params.modelDeployment;
    
    let config =
      [
          {
              "name": params.graphStore,
              "parameters": {}
          },
          {
              "name": "pulsar",
              "parameters": {}
          },
          {
              "name": params.vectorDB,
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
              "name": depl,
              "parameters": {}
          },
          {
              "name": "prompt-template",
              "parameters": {}
          },
      ];

      // Will collate some various parameters to apply to the config.
      // These get put into the 'null' pattern.

      if (params.chunkerType == "chunker-recursive") {
          config.push({
              "name": "override-recursive-chunker",
              "parameters": {}
          });
      }

      let parameters : { [k : string] : string | number } = {};
      let promptParams : { [k : string] : string | number } = {};

      parameters["chunk-size"] = params.chunkSize;
      parameters["chunk-overlap"] = params.chunkOverlap;
      parameters[depl + "-temperature"] = params.temperature;
      parameters[depl + "-max-output-tokens"] = params.maxOutputTokens;
      parameters[depl + "-model"] =  params.modelName;

      if (options.options.has(SYSTEM_PROMPT)) {
          promptParams["system-template"] = prompts.system;
      }

      if (options.options.has(DEFINITIONS_PROMPT)) {
          promptParams["extract-definitions"] = prompts.definitions;
      }

      if (options.options.has(RELATIONSHIPS_PROMPT)) {
          promptParams["extract-relationships"] = prompts.relationships;;
      }

      if (options.options.has(TOPICS_PROMPT)) {
          promptParams["extract-topics"] = prompts.topics;
      }

      if (options.options.has(KNOWLEDGE_QUERY_PROMPT)) {
          promptParams["kg-prompt"] = prompts.knowledgeQuery;
      }

      if (options.options.has(DOCUMENT_QUERY_PROMPT)) {
          promptParams["document-prompt"] = prompts.documentQuery;
      }

      if (options.options.has(ROWS_PROMPT)) {
          promptParams["extract-rows"] = prompts.rows;
      }

      config.push({
          "name": "null",
          "parameters": parameters,
      });

      config.push({
          "name": "prompt-overrides",
          "parameters": promptParams,
      });

      const cnf = JSON.stringify(config, null, 4)

      const platform = params.platform;
      const version = params.trustgraphVersion;

      return fetch(
          "/api/generate/" + platform + "/" + version, {
              body: cnf,
              method: "POST",
              headers: {
              }
           }
      );

};

