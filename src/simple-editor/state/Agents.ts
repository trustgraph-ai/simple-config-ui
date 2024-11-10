
import { create } from 'zustand'

import * as prompts from '../prompts';

export interface Argument {
    name : string;
    type : string;
    description : string;
};

export interface Tool {
    id : string;
    name : string;
    type : string;
    description : string;
    config : { [key : string] : string };
    arguments : Argument[];
};

export interface Agents {

    tools : Tool[];

    setTools : (v : Tool[]) => void;

};

export const useAgentsStore = create<Agents>()(

    (set) => ({

        tools: [
            {
                id: "shuttle",
                name: "Shuttle knowledge",
                type: "knowledge-query",
                description: "Query a knowledge base with information about the space shuttle.  The query should be a simple natural language question",
                arguments: [
                    {
                        name: "query",
                        type: "string",
                        description: "The search query string",
                    }
                ]
            }
        ],

        setTools: (v) => set(() => ({
	    tools: v
	})),

    })

);

