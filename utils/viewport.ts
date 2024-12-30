type ViewportSize = 's' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const getViewportSize = (): ViewportSize => {
    const width = window.innerWidth;

    if (width < 640) {
        return 's';
    } else if (width >= 640 && width < 768) {
        return 'sm';
    } else if (width >= 768 && width < 1024) {
        return 'md';
    } else if (width >= 1024 && width < 1280) {
        return 'lg';
    } else if (width >= 1280 && width < 1536) {
        return 'xl';
    } else {
        return 'xxl';
    }
};

export default getViewportSize;
