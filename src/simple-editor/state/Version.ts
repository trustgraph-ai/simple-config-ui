
import { create } from 'zustand';

export interface Version {
    description : string;
    status : string;
    template : string;
    version : string;
};

export interface VersionState {
    version: Version;
    setVersion: (v: any) => void;
}

export const useVersionStateStore = create<VersionState>()(
    (set) => ({
        version: {
            description: "",
            status: "",
            template: "",
            version: "",
        },
        setVersion: (v) => set({ version: v }),
    })
);

