
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
            {
                id: "sample-query",
                name: "Sample query",
                type: "knowledge-query",
                config: {},
                description: "This tool queries a knowledge base that holds information about XYZ.  The query should be a natural language question.",
                arguments: [
                    {
                        name: "query",
                        type: "string",
                        description: "A simple natural language question.",
                    }
                ]
            },
            {
                id: "sample-completion",
                name: "Sample text completion",
                type: "text-completion",
                config: {},
                description: "This tool queries an LLM for further information.  The query should be a natural language question.",
                arguments: [
                    {
                        name: "question",
                        type: "string",
                        description: "The question which should be asked of the LLM.",
                    }
                ]
            }
        ],

        setTools: (v) => set(() => ({
	    tools: v
	})),

    })

);

