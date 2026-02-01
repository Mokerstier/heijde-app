import type { RouteRecordRaw } from 'vue-router';

const routesToTransform = ['index'];
const routesToExclude = ['login', 'index', 'blogs-post', 'blogs-slug', 'register'];

export type Link = {
    label: string;
    to: string;
};

export const useNavigation = () => {
    const { options } = useRouter();
    const filteredRoutes = options.routes.filter(
        (route) => !routesToExclude.includes(route.name as string)
    );
    const mappedRoutes = filteredRoutes.map((route) => {
        const transformed = transformRoute(route);
        return transformed as Link;
    });

    // always have home as first link
    mappedRoutes.unshift({ label: 'home', to: '/' });

    return mappedRoutes;
};

const mappedRouteNames = {
    index: 'home',
};

const transformRoute = (route: RouteRecordRaw) => {
    if (!route.name) return;
    if (routesToTransform.includes(route.name as string)) {
        return {
            label: mappedRouteNames[route.name as keyof typeof mappedRouteNames],
            to: route.path,
        };
    } else {
        return { label: route.name, to: route.path };
    }
};

