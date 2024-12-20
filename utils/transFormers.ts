import type { RepoLanguages, RepoOutline } from '~/types/Repo';

/**
 * Transforms an object of type { [key: string]: string } to an array of objects of the same type.
 * @param obj - The input object to transform.
 * @returns An array of objects.
 */
export const transformObjectToArray = <T extends { [key: string]: string }>(obj: T): T[] => {
    return Object.keys(obj).map((key) => ({ [key]: obj[key] }) as T);
};

export const transformRepoOutline = (repo: any, languages: RepoLanguages): RepoOutline => {
    return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        homepage: repo.html_url,
        languages,
    };
};
