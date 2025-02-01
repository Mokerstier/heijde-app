import { ref, onMounted, onUnmounted } from 'vue';
import getViewportSize, { type ViewportSize } from '../utils/viewport';

export function useViewportSize() {
    const viewportSize = ref<ViewportSize>();

    const handleResize = () => {
        viewportSize.value = getViewportSize();
    };

    onMounted(() => {
        window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
    });

    return { viewportSize };
}
