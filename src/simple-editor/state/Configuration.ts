import { create } from 'zustand';

const TRUSTGRAPH_VERSION = "0.20.0";

export interface ModelParams {
    deployment : string;
    modelName : string;
    temperature : number;
    maxOutputTokens : number;
};

export interface ConfigurationState {

    graphStore: string;
    vectorDB: string;
    chunkerType: string;
    chunkSize: number;
    chunkOverlap: number;
    platform: string;
    trustgraphVersion: string;

    dualModelMode: boolean;

    mainModel : ModelParams;
    ragModel : ModelParams;

    setGraphStore: (v: string) => void;
    setVectorDB: (v: string) => void;
    setChunkerType: (v: string) => void;
    setChunkSize: (v: number) => void;
    setChunkOverlap: (v: number) => void;

    setPlatform: (v: string) => void;

    setDualModelMode: (v: boolean) => void;
    setMainModel: (v: ModelParams) => void;
    setRagModel: (v: ModelParams) => void;

}

export const useConfigurationStateStore = create<ConfigurationState>()(
    (set) => ({

        graphStore: "cassandra",
        vectorDB: "qdrant",
        chunkerType: "chunker-recursive",
        chunkSize: 1000,
        chunkOverlap: 50,
        platform: "docker-compose",
        trustgraphVersion: TRUSTGRAPH_VERSION,

        dualModelMode: false,

        mainModel: {
            deployment: "ollama",
            modelName: "gemma2:9b",
            temperature: 0.3,
            maxOutputTokens: 2048,
        },

        ragModel: {
            deployment: "ollama",
            modelName: "gemma2:9b",
            temperature: 0.3,
            maxOutputTokens: 2048,
        },

        setGraphStore: (v) => set({ graphStore: v }),
        setVectorDB: (v) => set({ vectorDB: v }),
        setChunkerType: (v) => set({ chunkerType: v }),
        setChunkSize: (v) => set({ chunkSize: v }),
        setChunkOverlap: (v) => set({ chunkOverlap: v }),
        setPlatform: (v) => set({ platform: v }),

        setDualModelMode: (v) => set({ dualModelMode: v }),
        setMainModel: (v) => set({ mainModel: v }),
        setRagModel: (v) => set({ ragModel: v }),

    })
);
