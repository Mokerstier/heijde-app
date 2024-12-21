import type { EnrichedLanguage, RepoLanguages, RepoOutline } from '~/types/Repo';

/**
 * Transforms an object of type { [key: string]: string } to an array of objects of the same type.
 * @param obj - The input object to transform.
 * @returns An array of objects.
 */
export const transformObjectToArray = <T extends { [key: string]: string }>(obj: T): T[] => {
    return Object.keys(obj).map((key) => ({ [key]: obj[key] }) as T);
};

export const enrichLanguagesObject = (languages: RepoLanguages): EnrichedLanguage[] => {
    console.log(languages);
    return Object.keys(languages).map((key) => {
        return {
            name: key,
            bytes: languages[key],
        };
    });
};

export const transformRepoOutline = (repo: any, languages: RepoLanguages): RepoOutline => {
    // const enrichedLanguages = enrichLanguagesObject(languages);

    return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        updated_at: repo.updated_at,
        homepage: repo.html_url,
        languages,
    };
};
