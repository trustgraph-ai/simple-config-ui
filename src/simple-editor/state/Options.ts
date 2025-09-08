
import { create } from 'zustand'

export const CONFIGURE_WORKBENCH = "configure-workbench";

export const CONFIGURE_OCR = "configure-ocr";

export const CONFIGURE_EMBEDDINGS = "configure-embeddings";

export interface Options {

    options : Set<string>;
    setOptions : (v: Set<string>) => void;
}

export const useOptionsStore = create<Options>()(
    (set) => ({

        options: new Set<string>([
            CONFIGURE_WORKBENCH,
        ]),

        setOptions: (v) => set(() => ({
	    options: v
	})),

    })
);

