import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TransitionProps } from 'vue';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type BlogMorph = { rect: DOMRect; clone: HTMLElement };
let pendingMorph: BlogMorph | null = null;
let activeMorph: HTMLElement | null = null;

/**
 * Call right before navigating from a blog card to its detail page. The page
 * transition then grows that card into the detail hero instead of the panel wipe.
 */
export const rememberBlogMorph = (card: HTMLElement) => {
    pendingMorph = {
        rect: card.getBoundingClientRect(),
        clone: card.cloneNode(true) as HTMLElement,
    };
};

/**
 * GSAP-driven page transition: coloured panels sweep up over the old page,
 * the destination name scrambles in, then the panels sweep off the new page.
 * Pairs with <PageTransitionOverlay />.
 */
export const usePageTransition = (): TransitionProps => {
    const router = useRouter();
    // useRoute() still reports the page being left while the leave hook runs, so the
    // destination is captured as soon as navigation starts.
    let destination = router.currentRoute.value.path;
    router.beforeEach((to) => {
        destination = to.path;
    });
    let smoothness = 0;

    return {
        mode: 'out-in',
        css: false,

        onLeave(el, done) {
            const morph = pendingMorph;
            pendingMorph = null;

            if (prefersReducedMotion()) {
                gsap.to(el, { autoAlpha: 0, duration: 0.2, onComplete: done });
                return;
            }

            // Jump, don't glide, to the new scroll position while the overlay covers the page.
            const smoother = ScrollSmoother.get();
            if (smoother) {
                smoothness = smoother.smooth();
                smoother.smooth(0);
            }

            if (morph) {
                // Card -> detail: a clone of the card grows until it fills the viewport.
                const wrapper = document.createElement('div');
                const { top, left, width, height } = morph.rect;
                Object.assign(wrapper.style, {
                    position: 'fixed',
                    zIndex: '100',
                    top: `${top}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    height: `${height}px`,
                    overflow: 'hidden',
                    background: '#0e0b1f',
                    border: '1px solid #342d5c',
                    pointerEvents: 'none',
                });
                wrapper.setAttribute('aria-hidden', 'true');
                morph.clone.removeAttribute('id');
                Object.assign(morph.clone.style, { width: `${width}px`, margin: '0', border: '0' });
                wrapper.append(morph.clone);
                document.body.append(wrapper);
                activeMorph = wrapper;

                gsap.timeline({ onComplete: done })
                    .to(el, { autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, 0)
                    .to(morph.clone, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, 0.15)
                    .to(
                        wrapper,
                        {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            borderColor: '#0e0b1f',
                            duration: 0.75,
                            ease: 'power4.inOut',
                        },
                        0
                    );
                return;
            }

            const label = `#${destination.split('/')[1] || 'home'}`;

            gsap.timeline({ onComplete: done })
                .set('#pt-overlay', { autoAlpha: 1 })
                .fromTo(
                    '.pt-panel',
                    { yPercent: 100 },
                    { yPercent: 0, duration: 0.6, ease: 'power4.inOut', stagger: 0.08 }
                )
                .to(el, { y: -60, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 0)
                .fromTo(
                    '#pt-label',
                    { autoAlpha: 0, y: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.5,
                        scrambleText: { text: label, chars: '01#<>/{}', speed: 0.6 },
                    },
                    '-=0.25'
                );
        },

        onEnter(el, done) {
            if (prefersReducedMotion()) {
                gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, onComplete: done });
                return;
            }

            if (activeMorph) {
                // The detail page is already rendered underneath: shrink the covering
                // card down to the hero's rectangle, then fade it away.
                const wrapper = activeMorph;
                activeMorph = null;
                window.scrollTo(0, 0);
                ScrollSmoother.get()?.scrollTop(0);
                const hero = document.querySelector<HTMLElement>('#blog-hero');
                const rect = hero?.getBoundingClientRect();

                gsap.timeline({
                    onComplete() {
                        wrapper.remove();
                        ScrollSmoother.get()?.smooth(smoothness);
                        ScrollTrigger.refresh();
                        done();
                    },
                })
                    .to(wrapper, {
                        top: rect?.top ?? 0,
                        height: rect?.height ?? window.innerHeight * 0.6,
                        duration: 0.7,
                        ease: 'power4.inOut',
                    })
                    .to(wrapper, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' }, '-=0.3');
                return;
            }

            const panels = gsap.utils.toArray<HTMLElement>('.pt-panel').reverse();

            gsap.timeline({
                onComplete() {
                    gsap.set('#pt-overlay', { autoAlpha: 0 });
                    ScrollSmoother.get()?.smooth(smoothness);
                    ScrollTrigger.refresh();
                    done();
                },
            })
                .to('#pt-label', { autoAlpha: 0, y: -20, duration: 0.3 }, 0.15)
                .to(
                    panels,
                    { yPercent: -100, duration: 0.7, ease: 'power4.inOut', stagger: 0.08 },
                    0.15
                )
                .from(el, { y: 80, duration: 0.9, ease: 'power3.out', clearProps: 'transform' }, 0.3);
        },
    };
};
