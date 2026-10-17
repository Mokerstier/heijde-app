import { Octokit } from 'octokit';
import { RepoOutline } from '~/types/Repo';
import { transformRepoOutline } from '~/utils/transFormers';

// Cached for an hour (stale-while-revalidate): every uncached call costs 1 + 2 x 12 GitHub
// requests, which is slow enough to hit a serverless function timeout on a cold start.
export default defineCachedEventHandler(
    async () => {
        const twelveMostRecentWithLanguages = async (repos: any): Promise<RepoOutline[]> => {
            return repos.map(async (repo: any) => {
                // The language list and the banner image don't depend on each other.
                const [languages, image] = await Promise.all([
                    octokit.request(`GET /repos/Mokerstier/${repo.name}/languages`, {
                        owner: 'Mokerstier',
                        repo: repo.name,
                    }),
                    // Most repos have no banner, so a 404 here is expected.
                    octokit
                        .request(`GET /repos/Mokerstier/${repo.name}/contents/Banner-image.png`, {
                            owner: 'Mokerstier',
                            repo: repo.name,
                        })
                        .catch(() => null),
                ]);

                return transformRepoOutline(repo, languages.data, image?.data);
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

        const filteredReposOwnedByMe = repos.data.filter(
            (repo) => repo.owner.login === 'Mokerstier' && repo.language !== null
        );
        const sortedData = filteredReposOwnedByMe.sort(
            (a, b) =>
                new Date(b.updated_at as string).getTime() -
                new Date(a.updated_at as string).getTime()
        );
        const twelveMostRecentProjects = sortedData.slice(0, 12);
        const repoOutlines = await twelveMostRecentWithLanguages(twelveMostRecentProjects);
        const resolvedRepoOutlines = await Promise.all(repoOutlines);
        return resolvedRepoOutlines;
    },
    { maxAge: 60 * 60, swr: true, name: 'github-repos', getKey: () => 'repos' }
);
