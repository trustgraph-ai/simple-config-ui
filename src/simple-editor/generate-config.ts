
export const generateConfig =
(
    graphStore : string, modelDeployment : string, vectorDB : string,
    chunkSize : number, chunkOverlap : number,
    maxOutputTokens : number, modelName : string,
    chunkerType : string, temperature : number,
) => {

    let config =
      [
          {
              "name": graphStore,
              "parameters": {}
          },
          {
              "name": "pulsar",
              "parameters": {}
          },
          {
              "name": vectorDB,
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
              "name": modelDeployment,
              "parameters": {}
          },
      ];

      if (chunkerType == "chunker-recursive") {
          config.push({
              "name": "override-recursive-chunker",
              "parameters": {
                  "chunk-size": chunkSize,
                  "chunk-overlap": chunkOverlap,
              }
          });
      } else {
          config.push({
              "name": "null",
              "parameters": {
                  "chunk-size": chunkSize,
                  "chunk-overlap": chunkOverlap,
              }
          });
      }

      config.push({
          name: "null",
          parameters: {
              [modelDeployment + "-temperature"]: temperature,
              [modelDeployment + "-max-output-tokens"]: maxOutputTokens,
              [modelDeployment + "-model"]: modelName,
          }
      });

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
