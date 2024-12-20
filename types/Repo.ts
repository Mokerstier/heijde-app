export type RepoLanguages = { [key: string]: string };

export type RepoOutline = {
    name: string;
    description: string | null;
    language: string | null;
    updated_at: string;
    homepage: string | null;
    languages: RepoLanguages;
};
