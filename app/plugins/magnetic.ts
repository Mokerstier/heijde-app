import gsap from 'gsap';

type MagneticElement = HTMLElement & { __magneticCleanup?: () => void };

/**
 * `v-magnetic` pulls an element towards the pointer while hovered and springs it
 * back on leave. The binding value is the pull strength (default 0.35, 0 disables).
 */
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive<MagneticElement, number | undefined>('magnetic', {
        mounted(el, binding) {
            const strength = binding.value ?? 0.35;
            const canHover = window.matchMedia(
                '(pointer: fine) and (prefers-reduced-motion: no-preference)'
            ).matches;
            if (!strength || !canHover) return;

            const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });

            const onMove = (event: PointerEvent) => {
                const { left, top, width, height } = el.getBoundingClientRect();
                xTo((event.clientX - (left + width / 2)) * strength);
                yTo((event.clientY - (top + height / 2)) * strength);
            };
            const onLeave = () => {
                xTo(0);
                yTo(0);
            };

            el.addEventListener('pointermove', onMove);
            el.addEventListener('pointerleave', onLeave);
            el.__magneticCleanup = () => {
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerleave', onLeave);
                gsap.killTweensOf(el);
            };
        },
        beforeUnmount(el) {
            el.__magneticCleanup?.();
        },
        getSSRProps() {
            return {};
        },
    });
});
