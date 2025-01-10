
import { ConfigurationState } from './state/Configuration';
import { Prompts } from './state/Prompts';
import { Agents } from './state/Agents';
import {
    Options, CONFIGURE_PROMPTS, CONFIGURE_AGENTS, CONFIGURE_WORKBENCH,
} from './state/Options';

export const generateConfig =
(
    config : ConfigurationState,
    prompts : Prompts,
    agents : Agents,
    options : Options,
) => {

    const depl = config.modelDeployment;
    
    let buildout =
      [
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

      if (config.chunkerType == "chunker-recursive") {
          buildout.push({
              "name": "override-recursive-chunker",
              "parameters": {}
          });
      }

      let parameters : { [k : string] : string | number } = {};

      parameters["chunk-size"] = config.chunkSize;
      parameters["chunk-overlap"] = config.chunkOverlap;
      parameters[depl + "-temperature"] = config.temperature;
      parameters[depl + "-max-output-tokens"] = config.maxOutputTokens;
      parameters[depl + "-model"] =  config.modelName;

      if (options.options.has(CONFIGURE_PROMPTS)) {

          let promptParams = prompts.prompts.reduce(
              (obj, elt) => ({ ...obj, [elt.id]: elt.prompt }), {}
          );
  
          buildout.push({
              "name": "prompt-overrides",
              "parameters": promptParams,
          });
          
      }

      if (options.options.has(CONFIGURE_AGENTS)) {

          let toolParams = agents.tools;
  
          buildout.push({
              "name": "agent-manager-react",
              "parameters": {
                  "tools": toolParams
              },
          });
          
      }

      if (options.options.has(CONFIGURE_WORKBENCH)) {
  
          buildout.push({
              "name": "workbench-ui",
              "parameters": {
              },
          });
          
      }

      buildout.push({
          "name": "null",
          "parameters": parameters,
      });

      const buildoutEnc = JSON.stringify(buildout, null, 4)

      const platform = config.platform;
      const version = config.trustgraphVersion;

      return fetch(
          "/api/generate/" + platform + "/" + version, {
              body: buildoutEnc,
              method: "POST",
              headers: {
              }
           }
      );

};

