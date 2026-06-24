interface ImportMetaEnv {
    readonly IS_DEV: boolean;
    readonly API: string;
    readonly PROJECT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}