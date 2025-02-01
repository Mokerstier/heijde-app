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
    image?: string;
};

export interface FileDetails {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content: string;
    encoding: string;
    _links: {
        self: string;
        git: string;
        html: string;
    };
}
