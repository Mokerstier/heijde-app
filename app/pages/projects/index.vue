<template>
    <div>
        <section class="container">
            <HeaderBlock
                prefix="/"
                title="projects"
                sub-title="An overview of my most recent projects"></HeaderBlock>
        </section>
        <section ref="pinWrap" class="projects-pin mt pb-12 lg:pb-0">
            <div ref="track" class="projects-track container grid gap-2 lg:grid-cols-3">
                <!-- Soft aurora behind the cards; the wrappers drift slower than the row. -->
                <span v-for="n in 4" :key="n" :class="`orb orb-${n}`" aria-hidden="true"
                    ><span class="orb-glow"
                /></span>
                <ProjectCard
                    v-for="repo in data"
                    :key="repo.name"
                    :repo="repo"
                    :expanded="expandedName === repo.name"
                    @toggle="toggle(repo.name)" />
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { RepoOutline } from '~/types/Repo';

const data = await useFetchWithCache<RepoOutline[]>('/api/github');

const pinWrap = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
const expandedName = ref<string | null>(null);
// The pinned, scrubbed horizontal scroll (set while the desktop layout is active).
let rowTrigger: ScrollTrigger | undefined;

// Expanding a card re-flows its siblings: Flip animates that layout change and the
// horizontal scroll distance is recalculated afterwards.
const toggle = async (name: string) => {
    const cards = track.value?.querySelectorAll('.project-card');
    const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const state = animate && cards ? Flip.getState(cards) : null;

    // While horizontal, remember how far the row is shifted: 1px of sideways travel is
    // exactly 1px of scroll, so after the layout changes we can scroll back to the same
    // shift and nothing jumps.
    const row = track.value;
    const horizontal = !!row?.classList.contains('is-horizontal') && !!rowTrigger;
    const shiftBefore = horizontal ? Math.abs(Number(gsap.getProperty(row, 'x'))) : 0;

    expandedName.value = expandedName.value === name ? null : name;
    await nextTick();

    ScrollTrigger.refresh();
    if (horizontal && rowTrigger) {
        const target = rowTrigger.start + shiftBefore;
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTo(target, false);
        else window.scrollTo(0, target);
        ScrollTrigger.update();
    }

    if (state) {
        Flip.from(state, {
            duration: 0.6,
            ease: 'power3.inOut',
            absolute: false,
            nested: true,
        });
    }
};

// Desktop: pin the section and scrub the card row sideways while scrolling down.
// Below lg (or with reduced motion) the cards stay a plain stacked grid.
useGsap(pinWrap, ({ gsap, reducedMotion }) => {
    if (reducedMotion || !track.value || !pinWrap.value) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
        const row = track.value!;
        row.classList.add('is-horizontal');

        const distance = () => Math.max(0, row.scrollWidth - pinWrap.value!.clientWidth);

        const scrub = gsap.to(row, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
                trigger: pinWrap.value,
                start: 'top top',
                end: () => `+=${distance()}`,
                pin: true,
                // No smoothing here: ScrollSmoother already smooths, and a lagging scrub would
                // drift after toggle() realigns the scroll position.
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Parallax: the glows travel slower than the cards, which adds depth.
        gsap.to('.orb', {
            x: (i: number) => distance() * (0.16 + 0.06 * i),
            ease: 'none',
            scrollTrigger: {
                trigger: pinWrap.value,
                start: 'top top',
                end: () => `+=${distance()}`,
                scrub: true,
                invalidateOnRefresh: true,
            },
        });

        // Each card eases in from the right (small lift, tilt and scale) and drifts out
        // to the left with a slight tilt. Subtle on purpose: a few degrees, a few dozen px.
        gsap.utils.toArray<HTMLElement>('.project-card', row).forEach((card, index) => {
            const tilt = index % 2 ? 1 : -1;
            gsap.fromTo(
                card,
                { y: 60 + (index % 3) * 14, rotate: tilt * 3, scale: 0.94, autoAlpha: 0.2 },
                {
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    autoAlpha: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrub,
                        start: 'left 96%',
                        end: 'left 58%',
                        scrub: true,
                    },
                }
            );
            gsap.to(card, {
                y: -24,
                rotate: -tilt * 2,
                scale: 0.96,
                autoAlpha: 0.3,
                ease: 'power1.in',
                immediateRender: false,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrub,
                    start: 'right 28%',
                    end: 'right 2%',
                    scrub: true,
                },
            });
        });

        rowTrigger = scrub.scrollTrigger;

        // The aside lives in the layout, outside this page's gsap scope, so grab it directly.
        const aside = document.querySelector('.aside');
        // While the cards are pinned in the vertical middle, nudge the social aside up.
        ScrollTrigger.create({
            trigger: pinWrap.value,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            onToggle: (self) =>
                gsap.to(aside, { y: self.isActive ? -56 : 0, duration: 0.8, ease: 'power3.out' }),
        });

        return () => {
            gsap.to(aside, { y: 0, duration: 0.5, ease: 'power3.out' });
            rowTrigger = undefined;
            row.classList.remove('is-horizontal');
        };
    });

    // Stacked layout: cards rise in one by one as they scroll into view.
    mm.add('(max-width: 1023px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('.project-card', track.value);
        gsap.set(cards, { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(cards, {
            start: 'top 90%',
            once: true,
            onEnter: (batch) =>
                gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 }),
        });
    });

    return () => mm.revert();
});

useHead({
    title: 'Projects | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'An overview of my most recent projects',
        },
    ],
});
</script>
<style>
@reference '~/assets/css/main.css';
.projects-pin {
    overflow-x: clip;
}
.projects-track {
    position: relative;
    isolation: isolate;
}
.orb {
    position: absolute;
    z-index: -1;
    width: 36rem;
    height: 36rem;
    pointer-events: none;
}
.orb-glow {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background: radial-gradient(
        circle at 50% 50%,
        color-mix(in oklab, var(--orb-color) 70%, transparent) 0%,
        transparent 65%
    );
    opacity: 0.85;
    animation: orb-drift 16s ease-in-out infinite alternate;
    will-change: transform;
}
.orb-1 {
    --orb-color: var(--color-primary);
    left: -6%;
    top: 40%;
}
.orb-2 {
    --orb-color: var(--color-accent);
    left: 26%;
    top: -10%;
}
.orb-3 {
    --orb-color: var(--color-primary);
    left: 55%;
    top: 45%;
}
.orb-4 {
    --orb-color: var(--color-accent);
    left: 80%;
    top: -5%;
}
.orb-2 .orb-glow {
    animation-duration: 20s;
}
.orb-3 .orb-glow {
    animation-duration: 18s;
    animation-delay: -6s;
}
@keyframes orb-drift {
    from {
        transform: translate(0, 0) scale(1);
    }
    to {
        transform: translate(48px, -36px) scale(1.12);
    }
}
.projects-pin:has(.is-horizontal) {
    @apply flex h-screen items-center overflow-hidden;
}
.projects-track.is-horizontal {
    @apply flex w-max max-w-none flex-nowrap items-stretch gap-16 pr-[12vw];

    .project-card {
        flex: 0 0 420px;
        transition: none;

        &.is-expanded {
            flex-basis: 860px;
        }
    }
}
</style>
