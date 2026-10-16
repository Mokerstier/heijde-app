import gsap from 'gsap';
import type { Ref } from 'vue';

type GsapSetup = (context: {
    gsap: typeof gsap;
    reducedMotion: boolean;
}) => void | (() => void);

/**
 * Runs GSAP animations scoped to a component root.
 * Every tween, timeline, ScrollTrigger and SplitText created inside `setup` is
 * reverted on unmount, so nothing leaks across page transitions.
 * `setup` is re-run when the user's reduced-motion preference changes.
 */
export const useGsap = (scope: Ref<HTMLElement | null>, setup: GsapSetup) => {
    let mm: gsap.MatchMedia | undefined;

    onMounted(() => {
        mm = gsap.matchMedia(scope.value ?? undefined);
        mm.add(
            {
                reducedMotion: '(prefers-reduced-motion: reduce)',
                fullMotion: '(prefers-reduced-motion: no-preference)',
            },
            (context) => setup({ gsap, reducedMotion: !!context.conditions?.reducedMotion })
        );
    });

    onBeforeUnmount(() => {
        mm?.revert();
    });
};
