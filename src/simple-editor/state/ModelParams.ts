
import { create } from 'zustand'

interface ModelParams {

    graphStore : string;
    vectorDB : string;
    chunkerType: string;
    chunkSize : number;
    chunkOverlap : number;
    modelDeployment : string;
    modelName : string;
    temperature : number;
    maxOutputTokens : number;
    deploymentConfig : string;
    configUrl : string;

    definitionsPrompt : string;
    relationshipsPrompt : string;
    topicsPrompt : string;
    knowledgeQueryPrompt : string;

    advancedOptions : Set<string>;

    setGraphStore : (v : string) => void;
    setVectorDB : (v : string) => void;
    setChunkerType: (v : string) => void;
    setChunkSize : (v : number) => void;
    setChunkOverlap : (v : number) => void;
    setModelDeployment : (v : string) => void;
    setModelName : (v : string) => void;
    setTemperature : (v : number) => void;
    setMaxOutputTokens : (v : number) => void;
    setDeploymentConfig : (v : string) => void;
    setConfigUrl : (v : string) => void;

    setDefinitionsPrompt : (v : string) => void;
    setRelationshipsPrompt : (v : string) => void;
    setTopicsPrompt : (v : string) => void;
    setKnowledgeQueryPrompt : (v : string) => void;

    setAdvancedOptions : (v: Set<string>) => void;
}

export const useModelParamsStore = create<ModelParams>()(
    (set) => ({

        graphStore: "cassandra",
        vectorDB: "qdrant",
        chunkerType: "chunker-recursive",
        chunkSize: 1000,
        chunkOverlap: 200,
        modelDeployment: "ollama",
        modelName: "gemma2:9b",
        temperature: 0.3,
        maxOutputTokens: 1000,
        deploymentConfig: "",
        configUrl: "",
        definitionsPrompt: "",
        relationshipsPrompt: "",
        topicsPrompt: "",
        knowledgeQueryPrompt: "",

        advancedOptions: new Set<string>(""),

        setGraphStore: (v) => set(() => ({
	    graphStore: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setVectorDB: (v) => set(() => ({
	    vectorDB: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setChunkerType: (v) => set(() => ({
	    chunkerType: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setChunkSize: (v) => set(() => ({
	    chunkSize: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setChunkOverlap: (v) => set(() => ({
	    chunkOverlap: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setModelDeployment: (v) => set(() => ({
	    modelDeployment: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setModelName: (v) => set(() => ({
	    modelName: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setTemperature: (v) => set(() => ({
	    temperature: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setMaxOutputTokens: (v) => set(() => ({
	    maxOutputTokens: v,
	    configUrl: "",
	    deploymentConfig: "",
	})),

        setDeploymentConfig: (v) => set(() => ({
	    deploymentConfig: v
	})),

        setConfigUrl: (v) => set(() => ({
	    configUrl: v
	})),

        setDefinitionsPrompt: (v) => set(() => ({
	    definitionsPrompt: v
	})),

        setRelationshipsPrompt: (v) => set(() => ({
	    relationshipsPrompt: v
	})),

        setTopicsPrompt: (v) => set(() => ({
	    topicsPrompt: v
	})),

        setKnowledgeQueryPrompt: (v) => set(() => ({
	    knowledgeQueryPrompt: v
	})),

        setAdvancedOptions: (v) => set(() => ({
	    advancedOptions: v
	})),

    })
);

