export type RepoLanguages = { [key: string]: number };

export type EnrichedLanguage = {
    name: string;
    bytes: number;
};

export type RepoOutline = {
    name: string;
    description: string | null;
    language: string | null;
    updated_at: string;
    homepage: string | null;
    languages: RepoLanguages;
};
