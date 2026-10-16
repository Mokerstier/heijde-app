<template>
    <section ref="root" class="container">
        <HeaderBlock
            :title="Header.title ?? ''"
            :show-border="Header.showBorder"
            :sub-title="Header.subTitle"></HeaderBlock>
        <div class="relative mt-3 grid gap-14 lg:grid-cols-2">
            <div
                ref="visualEl"
                class="absolute bottom-0 left-0 -z-10 h-full w-full text-primary lg:static">
                <SvgComponent :class="Visual.class" :icon="Visual.icon" />
            </div>
            <div class="grid items-center gap-4 md:grid-cols-2">
                <div class="flex flex-col gap-4">
                    <SkillCard
                        v-for="card in SkillCards.Cards.slice(0, 2)"
                        :title="card.title"
                        :skills="card.skills" />
                </div>
                <div class="flex flex-col gap-4">
                    <SkillCard
                        v-for="card in SkillCards.Cards.slice(2)"
                        :title="card.title"
                        :skills="card.skills" />
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ChildrenProps, SkillBlock, Visual } from '#shared/models/page.schema';

const props = defineProps<SkillBlock>();
if (props === undefined) throw Error;
const [Header, Visual, SkillCards]: [
    ChildrenProps['Header'],
    ChildrenProps['Visual'],
    ChildrenProps['SkillCards'],
] = props.children;

const root = ref<HTMLElement | null>(null);
const visualEl = ref<HTMLElement | null>(null);

// Cards rise in one by one as the grid scrolls into view, then their skills pop in.
useGsap(root, ({ gsap, reducedMotion }) => {
    if (reducedMotion) return;

    const cards = gsap.utils.toArray<HTMLElement>('.skill-card', root.value);
    const visual = visualEl.value;
    if (!cards.length) return;

    gsap.set(cards, { autoAlpha: 0, y: 48, rotate: 1.5 });

    ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
            gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                rotate: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15,
                onStart: () => {
                    batch.forEach((card) =>
                        gsap.from(card.querySelectorAll('li'), {
                            autoAlpha: 0,
                            y: 8,
                            duration: 0.4,
                            stagger: 0.04,
                            delay: 0.3,
                        })
                    );
                },
            });
        },
    });

    if (visual) {
        gsap.from(visual, {
            autoAlpha: 0,
            scale: 0.9,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: visual, start: 'top 85%', once: true },
        });
    }
});
</script>
