
import { create } from 'zustand'

import * as prompts from '../prompts';

export interface Prompts {

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

}

export const usePromptsStore = create<Prompts>()(

    (set) => ({

        system: prompts.default_system_prompt,
        definitions: prompts.default_definition_prompt,
        relationships: prompts.default_relationship_prompt,
        topics: prompts.default_topics_prompt,
        knowledgeQuery: prompts.default_knowledge_query_prompt,
        documentQuery: prompts.default_document_query_prompt,
        rows: prompts.default_rows_prompt,

        setSystem: (v) => set(() => ({
	    system: v
	})),

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

    })
);

