
import { create } from 'zustand'

export const CONFIGURE_PROMPTS = "configure-prompts";

export interface Options {

    options : Set<string>;
    setOptions : (v: Set<string>) => void;
}

export const useOptionsStore = create<Options>()(
    (set) => ({

        options: new Set<string>(""),

        setOptions: (v) => set(() => ({
	    options: v
	})),

    })
);

