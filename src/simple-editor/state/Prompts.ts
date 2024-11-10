
import { create } from 'zustand'

import * as prompts from '../prompts';

export interface Prompt {
    id : string;
    name : string;
    prompt : string;
};

export interface Prompts {

    prompts : Prompt[];

    setSystem : (v : Prompt[]) => void;

/*
    system : string;
    definitions : string;
    relationships : string;
    topics : string;
    knowledgeQuery : string;
    documentQuery : string;
    rows : string;

    setSystem : (v : string) => void;
    setDefinitions : (v : string) => void;
    setRelationships : (v : string) => void;
    setTopics : (v : string) => void;
    setKnowledgeQuery : (v : string) => void;
    setDocumentQuery : (v : string) => void;
    setRows : (v : string) => void;
*/

};

export const usePromptsStore = create<Prompts>()(

    (set) => ({

        prompts: [
            {
                id: "system",
                name: "System",
                prompt: prompts.default_system_prompt,
            },
            {
                id: "definitions",
                name: "Extract definitions",
                prompt: prompts.default_definition_prompt,
            },
            {
                id: "relationships",
                name: "Extract relationships",
                prompt: prompts.default_relationship_prompt,
            },
            {
                id: "topics",
                name: "Extract topics",
                prompt: prompts.default_topics_prompt,
            },
            {
                id: "rows",
                name: "Extract rows",
                prompt: prompts.default_rows_prompt,
            },
            {
                id: "knowledge-query",
                name: "Knowledge graph query",
                prompt: prompts.default_knowledge_query_prompt,
            },
            {
                id: "document-query",
                name: "Document query",
                prompt: prompts.default_document_query_prompt,
            },
        ],

        setPrompts: (v) => set(() => ({
	    prompts: v
	})),

/*
        setDefinitions: (v) => set(() => ({
	    definitions: v
	})),

        setRelationships: (v) => set(() => ({
	    relationships: v
	})),

        setTopics: (v) => set(() => ({
	    topics: v
	})),

        setKnowledgeQuery: (v) => set(() => ({
	    knowledgeQuery: v
	})),

        setDocumentQuery: (v) => set(() => ({
	    documentQuery: v
	})),

        setRows: (v) => set(() => ({
	    rows: v
	})),
*/
    })

);

