
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
                id: "sample-query",
                name: "Sample Query",
                type: "knowledge-query",
                config: {},
                description: "Query a knowledge base that has already been extracted.  The query should be a simple natural language question.",
                arguments: [
                    {
                        name: "query",
                        type: "string",
                        description: "Describe the search query here.",
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
                id: "sample-completion",
                name: "Sample Text Completion",
                type: "text-completion",
                config: {},
                description: "Describe the request to send to LLM. This request will be sent with no additional context.",
                arguments: [
                    {
                        name: "response",
                        type: "string",
                        description: "The response expected from the LLM.",
                    }
                ]
            }
        ],

        setTools: (v) => set(() => ({
	    tools: v
	})),

    })

);

