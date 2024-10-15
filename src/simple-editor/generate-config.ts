
import { ModelParams } from './state/ModelParams';
import { Prompts } from './state/Prompts';
import {
    Options, DEFINITIONS_PROMPT, RELATIONSHIPS_PROMPT, TOPICS_PROMPT,
    KNOWLEDGE_QUERY_PROMPT, DOCUMENT_QUERY_PROMPT, ROWS_PROMPT,
} from './state/Options';

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

      parameters["chunk-size"] = params.chunkSize;
      parameters["chunk-overlap"] = params.chunkOverlap;
      parameters[depl + "-temperature"] = params.temperature;
      parameters[depl + "-max-output-tokens"] = params.maxOutputTokens;
      parameters[depl + "-model"] =  params.modelName;

      if (options.options.has(DEFINITIONS_PROMPT)) {
          parameters["prompt-definition-template"] = prompts.definitions;
      }

      if (options.options.has(RELATIONSHIPS_PROMPT)) {
          parameters["prompt-relationship-template"] = prompts.relationships;;
      }

      if (options.options.has(TOPICS_PROMPT)) {
          parameters["prompt-topic-template"] = prompts.topics;
      }

      if (options.options.has(KNOWLEDGE_QUERY_PROMPT)) {
          parameters["prompt-knowledge-query-template"] = prompts.knowledgeQuery;
      }

      if (options.options.has(DOCUMENT_QUERY_PROMPT)) {
          parameters["prompt-document-query-template"] = prompts.documentQuery;
      }

      if (options.options.has(ROWS_PROMPT)) {
          parameters["prompt-rows-template"] = prompts.rows;
      }

      if (params.chunkerType == "chunker-recursive") {
          config.push({
              "name": "null",
              "parameters": parameters,
          });
      }

      const cnf = JSON.stringify(config, null, 4)

      return fetch(
          "/api/generate", {
              body: cnf,
              method: "POST",
              headers: {
              }
           }
      );

};
