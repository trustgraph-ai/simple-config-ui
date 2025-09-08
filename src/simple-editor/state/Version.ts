
import { create } from 'zustand';

export interface Version {
    description : string;
    status : string;
    template : string;
    version : string;
};

export interface VersionState {
    version: Version;
    versions: Version[];
    versionsLoaded: boolean;
    setVersion: (v: any) => void;
    setVersions: (v: Version[]) => void;
}

export const useVersionStateStore = create<VersionState>()(
    (set) => ({
        version: {
            description: "",
            status: "",
            template: "",
            version: "",
        },
        versions: [],
        versionsLoaded: false,
        setVersion: (v) => set({ version: v }),
        setVersions: (v) => set({ versions: v, versionsLoaded: true }),
    })
);

