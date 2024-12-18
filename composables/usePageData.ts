export const usePageData = async (page: string) => {
    return await useFetchWithCache<typeof PageSchema>(`/api/pages/${page}`);
}