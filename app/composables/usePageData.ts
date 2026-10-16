import type { RootPage } from '#shared/models/page.schema';

export const usePageData = async (page: string) => {
    return await useFetchWithCache<RootPage>(`/api/pages/${page}`);
};
