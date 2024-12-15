import { Octokit } from 'octokit';

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
    const sortedData = filteredReposOwnedByMe.sort((a, b) => new Date(b.updated_at as string).getTime() - new Date(a.updated_at as string).getTime());
    const twelveMostRecentProjects = sortedData.slice(0, 12);

    return twelveMostRecentProjects;
  });