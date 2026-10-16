<template>
    <div ref="root">
        <TresCanvas alpha :clear-alpha="0" :dpr="[1, 1.25]" power-preference="high-performance">
            <HeroSceneContent :state="state" :paused="!inView" :calm="reducedMotion" />
        </TresCanvas>
    </div>
</template>
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Interactive WebGL hero backdrop. Client-only: render it as
 * <ClientOnly><LazyHeroScene /></ClientOnly> so three.js stays out of the main bundle.
 */
const root = ref<HTMLElement | null>(null);
// Plain object on purpose: scroll updates every frame and must not trigger Vue re-renders.
const state = { progress: 0 };
const inView = ref(true);
const reducedMotion = ref(false);

useGsap(root, (context) => {
    reducedMotion.value = context.reducedMotion;
    ScrollTrigger.create({
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => (state.progress = self.progress),
        onToggle: (self) => (inView.value = self.isActive || self.progress === 0),
    });
});
</script>
