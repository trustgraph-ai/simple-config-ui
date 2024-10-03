
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
              "name": "pulsar",
              "parameters": {}
          },
          {
              "name": "trustgraph-base",
              "parameters": {}
          },
          {
              "name": "graph-rag-" + graphStore,
              "parameters": {}
          },
          {
              "name": modelDeployment,
              "parameters": {}
          },
          {
              "name": "grafana",
              "parameters": {}
          },
          {
              "name": "vector-store-" + vectorDB,
              "parameters": {}
          }
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
      )

/*

.then(
          x => {
              if (x.ok) return x.text();
              return Promise.reject(x.statusText);
          }
      )

*/

;

};
