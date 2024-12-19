import { Octokit } from 'octokit';

export type RepoLanguages = [{ [key: string]: string }];

export type RepoOutline = {
    name: string;
    description: string | null;
    language: string | null;
    updated_at: string;
    homepage: string | null;
    languages: RepoLanguages;
};

export default defineEventHandler(async (event) => {
    const twelveMostRecentWithLanguages = async (repos: any): Promise<RepoOutline[]> => {
        return repos.map(async (repo: any) => {
            const languages = await octokit.request(
                `GET /repos/Mokerstier/${repo.name}/languages`,
                {
                    owner: 'Mokerstier',
                    repo: repo.name,
                }
            );
            const transformedRepo = transformRepoOutline(repo, [languages.data]);

            return transformedRepo;
        });
    };

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
    const repoOutlines = await twelveMostRecentWithLanguages(twelveMostRecentProjects);
    const resolvedRepoOutlines = await Promise.all(repoOutlines);
    return resolvedRepoOutlines;
});

const transformRepoOutline = (repo: any, languages: RepoLanguages): RepoOutline => {
    return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        homepage: repo.html_url,
        languages: ,
    };
};
