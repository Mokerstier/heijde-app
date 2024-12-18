import type { RootPage } from "~/server/models/page.schema";

export const usePageData = async (page: string) => {
    return await useFetchWithCache<RootPage>(`/api/pages/${page}`);
}