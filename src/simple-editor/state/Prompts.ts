
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

    setPrompts : (v : Prompt[]) => void;

};

export const usePromptsStore = create<Prompts>()(

    (set) => ({

        prompts: [
            {
                id: "system-template",
                name: "System",
                prompt: prompts.default_system_prompt,
                custom: false,
            },
            {
                id: "extract-definitions",
                name: "Extract definitions",
                prompt: prompts.default_definition_prompt,
                custom: false,
            },
            {
                id: "extract-relationships",
                name: "Extract relationships",
                prompt: prompts.default_relationship_prompt,
                custom: false,
            },
            {
                id: "extract-topics",
                name: "Extract topics",
                prompt: prompts.default_topics_prompt,
                custom: false,
            },
            {
                id: "extract-rows",
                name: "Extract rows",
                prompt: prompts.default_rows_prompt,
                custom: false,
            },
            {
                id: "kg-prompt",
                name: "Knowledge graph query",
                prompt: prompts.default_knowledge_query_prompt,
                custom: false,
            },
            {
                id: "document-prompt",
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

