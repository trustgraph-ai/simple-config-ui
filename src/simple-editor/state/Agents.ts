
import { create } from 'zustand'

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
/*
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
*/
            {
                id: "shuttle-kb",
                name: "Shuttle knowledge",
                type: "knowledge-query",
                config: {},
                description: "Query a knowledge base with information about the space shuttle program.  The query should be a simple natural language question",
                arguments: [
                    {
                        name: "query",
                        type: "string",
                        description: "The search query string",
                    }
                ]
            },
/*            {
                id: "cats-kb",
                name: "Mark's cats",
                type: "knowledge-query",
                config: {},
                description: "Query a knowledge base with information about Mark's cats.  The query should be a simple natural language question.",
                arguments: [
                    {
                        name: "query",
                        type: "string",
                        description: "The search query string",
                    }
                ]
            },
*/
            {
                id: "compute",
                name: "Compute",
                type: "text-completion",
                config: {},
                description: "Compute the answer to a computational problem.  The computation should be provided in the 'computation' argument",
                arguments: [
                    {
                        name: "computation",
                        type: "string",
                        description: "The computation to solve",
                    }
                ]
            }
        ],

        setTools: (v) => set(() => ({
	    tools: v
	})),

    })

);

