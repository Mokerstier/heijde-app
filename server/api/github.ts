import { Octokit } from 'octokit';
import useFetchWithCache from '~/composables/useFetchWithCache';

export type RepoOutline = {
    name: string;
    description: string | null;
    language: string | null;
    updated_at: string;
    homepage: string | null;
    languages: string[];
};

export default defineEventHandler(async (event) => {
    const { GITHUB_TOKEN } = useRuntimeConfig();

    const octokit = new Octokit({
        auth: GITHUB_TOKEN,
    });

    const repos = await octokit.request('GET /user/repos', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });

    const filteredReposOwnedByMe = repos.data.filter((repo) => repo.owner.login === 'Mokerstier');
    const sortedData = filteredReposOwnedByMe.sort(
        (a, b) =>
            new Date(b.updated_at as string).getTime() - new Date(a.updated_at as string).getTime()
    );
    const twelveMostRecentProjects = sortedData.slice(0, 12);
    const repoOutlines = twelveMostRecentProjects.map((repo) => transformRepoOutline(repo));
    return repoOutlines;
});

const fetchLanguages = async (url: string | null) => {
    if (url === null) return [];
    const response = await useFetchWithCache<{ [key: string]: string }>(url);
    return Object.keys(response.value);
};

const transformRepoOutline = async (repo: any): Promise<RepoOutline> => {
    const languages = (await fetchLanguages(repo.languages_url)) ?? [''];

    return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        homepage: repo.html_url,
        languages,
    };
};

