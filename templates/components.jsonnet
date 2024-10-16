{
   "azure": import "components/azure.jsonnet",
   "bedrock": import "components/bedrock.jsonnet",
   "claude": import "components/claude.jsonnet",
   "cohere": import "components/cohere.jsonnet",
   "document-rag": import "components/document-rag.jsonnet",
   "embeddings-hf": import "components/embeddings-hf.jsonnet",
   "embeddings-ollama": import "components/embeddings-ollama.jsonnet",
   "grafana": import "components/grafana.jsonnet",
   "graph-rag": import "components/graph-rag.jsonnet",
   "triple-store-cassandra": import "components/cassandra.jsonnet",
   "triple-store-neo4j": import "components/neo4j.jsonnet",
   "llamafile": import "components/llamafile.jsonnet",
   "ollama": import "components/ollama.jsonnet",
   "openai": import "components/openai.jsonnet",
   "override-recursive-chunker": import "components/chunker-recursive.jsonnet",
   "prompt-template-definitions": import "components/null.jsonnet",
   "prompt-template-document-query": import "components/null.jsonnet",
   "prompt-template-kq-query": import "components/null.jsonnet",
   "prompt-template-relationships": import "components/null.jsonnet",
   "prompt-template-rows-template": import "components/null.jsonnet",
   "prompt-generic": import "components/prompt-generic.jsonnet",
   "prompt-template": import "components/prompt-template.jsonnet",
   "pulsar": import "components/pulsar.jsonnet",
   "pulsar-manager": import "components/pulsar-manager.jsonnet",
   "trustgraph-base": import "components/trustgraph.jsonnet",
   "vector-store-milvus": import "components/milvus.jsonnet",
   "vector-store-qdrant": import "components/qdrant.jsonnet",
   "vertexai": import "components/vertexai.jsonnet",
   "null": {},

   // FIXME: Dupes
   "cassandra": import "components/cassandra.jsonnet",
   "neo4j": import "components/neo4j.jsonnet",
   "qdrant": import "components/qdrant.jsonnet",
   "milvus": import "components/milvus.jsonnet",
   "trustgraph": import "components/trustgraph.jsonnet",

}
