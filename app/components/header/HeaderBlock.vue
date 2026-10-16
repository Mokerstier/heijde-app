<template>
    <header ref="headerBlock" class="flex items-center gap-x-4">
        <h2
            class="relative text-xl lg:text-2xl xl:text-3xl"
            :class="{ 'mb-auto line-clamp-3': trim, 'inline': !trim }">
            <span class="text-primary">{{ prefix ?? '#' }}</span
            >{{ title }}
        </h2>
        <span
            v-if="showBorder"
            class="animate-border header-animation relative h-[1px] w-full bg-primary">
            <!-- Shimmer is a translated gradient (compositor-only), not an animated background-position. -->
            <span class="absolute inset-0 overflow-hidden" aria-hidden="true"
                ><span class="glow-slide block h-full w-[300%]"
            /></span>
        </span>

        <NuxtLink v-if="link" :to="link.url" class="ml-auto">{{ link.label }}</NuxtLink>
    </header>
    <span
        v-if="subTitle"
        class="mt-3 text-muted"
        :class="{ 'mt-auto line-clamp-4': trim, 'block': !trim }"
        >{{ subTitle }}</span
    >
</template>
<script lang="ts" setup>
import type { ContentHeader } from '#shared/models/page.schema';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zap } from '~/utils/lightning';

defineProps<ContentHeader>();

const headerBlock = ref<HTMLElement | null>(null);

// When the header scrolls into view the rule grows from the left and a bolt strikes
// along it. While the header stays in view it keeps zapping now and then.
useGsap(headerBlock, ({ gsap, reducedMotion }) => {
    const line = headerBlock.value?.querySelector<HTMLElement>('.header-animation');
    if (!line || reducedMotion) return;

    let inView = false;
    let timer: number | undefined;
    const idleZap = () => {
        timer = window.setTimeout(
            () => {
                if (inView) zap(line);
                idleZap();
            },
            6000 + Math.random() * 6000
        );
    };

    gsap.timeline({
        scrollTrigger: { trigger: headerBlock.value, start: 'top 90%', once: true },
    })
        .from(line, { scaleX: 0, transformOrigin: 'left center', duration: 0.9, ease: 'power3.out' })
        .call(() => zap(line), [], 0.5);

    ScrollTrigger.create({
        trigger: headerBlock.value,
        start: 'top 95%',
        end: 'bottom 5%',
        onToggle: (self) => (inView = self.isActive),
    });
    idleZap();

    return () => window.clearTimeout(timer);
});
</script>
<style scoped lang="scss">
.glow-slide {
    background-image: linear-gradient(
        to left,
        #187adc,
        #3d7bff 30%,
        #ffffff 45%,
        #3d7bff,
        #ffffff 55%,
        #3d7bff 70%,
        #187adc
    );
    animation: glow-slide 5s linear infinite;
    will-change: transform;
}

@keyframes glow-slide {
    from {
        transform: translateX(-66.667%);
    }
    to {
        transform: translateX(0);
    }
}
</style>
