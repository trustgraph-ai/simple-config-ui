
import { create } from 'zustand'

import * as prompts from '../prompts';

export interface Prompt {
    id : string;
    name : string;
    prompt : string;
    custom : boolean;
};

export interface Prompts {

    prompts : Prompt[];

    setSystem : (v : Prompt[]) => void;

};

export const usePromptsStore = create<Prompts>()(

    (set) => ({

        prompts: [
            {
                id: "system",
                name: "System",
                prompt: prompts.default_system_prompt,
                custom: false,
            },
            {
                id: "definitions",
                name: "Extract definitions",
                prompt: prompts.default_definition_prompt,
                custom: false,
            },
            {
                id: "relationships",
                name: "Extract relationships",
                prompt: prompts.default_relationship_prompt,
                custom: false,
            },
            {
                id: "topics",
                name: "Extract topics",
                prompt: prompts.default_topics_prompt,
                custom: false,
            },
            {
                id: "rows",
                name: "Extract rows",
                prompt: prompts.default_rows_prompt,
                custom: false,
            },
            {
                id: "knowledge-query",
                name: "Knowledge graph query",
                prompt: prompts.default_knowledge_query_prompt,
                custom: false,
            },
            {
                id: "document-query",
                name: "Document query",
                prompt: prompts.default_document_query_prompt,
                custom: false,
            },
        ],

        setPrompts: (v) => set(() => ({
	    prompts: v
	})),

    })

);

