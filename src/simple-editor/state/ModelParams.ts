import { create } from 'zustand';

const TRUSTGRAPH_VERSION = "0.19.16";

export interface ModelParams {
    graphStore: string;
    vectorDB: string;
    chunkerType: string;
    chunkSize: number;
    chunkOverlap: number;
    modelDeployment: string;
    modelName: string;
    temperature: number;
    maxOutputTokens: number;
    platform: string;
    trustgraphVersion: string;
    dualModelMode: boolean;
    extractionModelDeployment: string;
    extractionModelName: string;
    extractionTemperature: number;
    extractionMaxOutputTokens: number;
    ragModelDeployment: string;
    ragModelName: string;
    ragTemperature: number;
    ragMaxOutputTokens: number;
    setGraphStore: (v: string) => void;
    setVectorDB: (v: string) => void;
    setChunkerType: (v: string) => void;
    setChunkSize: (v: number) => void;
    setChunkOverlap: (v: number) => void;
    setModelDeployment: (v: string) => void;
    setModelName: (v: string) => void;
    setTemperature: (v: number) => void;
    setMaxOutputTokens: (v: number) => void;
    setPlatform: (v: string) => void;
    setDualModelMode: (v: boolean) => void;
    setExtractionModelDeployment: (v: string) => void;
    setExtractionModelName: (v: string) => void;
    setExtractionTemperature: (v: number) => void;
    setExtractionMaxOutputTokens: (v: number) => void;
    setRagModelDeployment: (v: string) => void;
    setRagModelName: (v: string) => void;
    setRagTemperature: (v: number) => void;
    setRagMaxOutputTokens: (v: number) => void;
}

export const useModelParamsStore = create<ModelParams>()(
    (set) => ({
        graphStore: "cassandra",
        vectorDB: "qdrant",
        chunkerType: "chunker-recursive",
        chunkSize: 1000,
        chunkOverlap: 50,
        modelDeployment: "ollama",
        modelName: "gemma2:9b",
        temperature: 0.3,
        maxOutputTokens: 2048,
        platform: "docker-compose",
        trustgraphVersion: TRUSTGRAPH_VERSION,
        dualModelMode: false,
        extractionModelDeployment: "ollama",
        extractionModelName: "gemma2:9b",
        extractionTemperature: 0.3,
        extractionMaxOutputTokens: 2048,
        ragModelDeployment: "ollama",
        ragModelName: "gemma2:9b",
        ragTemperature: 0.3,
        ragMaxOutputTokens: 2048,
        setGraphStore: (v) => set({ graphStore: v }),
        setVectorDB: (v) => set({ vectorDB: v }),
        setChunkerType: (v) => set({ chunkerType: v }),
        setChunkSize: (v) => set({ chunkSize: v }),
        setChunkOverlap: (v) => set({ chunkOverlap: v }),
        setModelDeployment: (v) => set({ modelDeployment: v }),
        setModelName: (v) => set({ modelName: v }),
        setTemperature: (v) => set({ temperature: v }),
        setMaxOutputTokens: (v) => set({ maxOutputTokens: v }),
        setPlatform: (v) => set({ platform: v }),
        setDualModelMode: (v) => set({ dualModelMode: v }),
        setExtractionModelDeployment: (v) => set({ extractionModelDeployment: v }),
        setExtractionModelName: (v) => set({ extractionModelName: v }),
        setExtractionTemperature: (v) => set({ extractionTemperature: v }),
        setExtractionMaxOutputTokens: (v) => set({ extractionMaxOutputTokens: v }),
        setRagModelDeployment: (v) => set({ ragModelDeployment: v }),
        setRagModelName: (v) => set({ ragModelName: v }),
        setRagTemperature: (v) => set({ ragTemperature: v }),
        setRagMaxOutputTokens: (v) => set({ ragMaxOutputTokens: v }),
    })
);
