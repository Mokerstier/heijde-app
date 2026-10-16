<template>
    <article
        class="skill-card group relative col-auto flex max-h-max grow-0 flex-col overflow-hidden border border-line bg-surface/85 shadow-[0_30px_70px_-40px_var(--color-primary),inset_0_1px_0_rgb(255_255_255/0.07)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-18px_var(--color-primary)]">
        <!-- Slim version of the blog/project cover: brand gradient, dot grid and a watermark. -->
        <div class="relative h-16 overflow-hidden bg-ink" :style="{ backgroundImage: gradient }">
            <div
                class="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-paper)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_right,black,transparent_75%)]" />
            <span
                class="absolute right-4 -bottom-2 font-mono text-5xl leading-none font-bold tracking-tighter text-paper/10 transition-transform duration-500 group-hover:-translate-y-1"
                aria-hidden="true"
                >{ }</span
            >
            <div class="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
        </div>

        <div class="flex flex-col gap-3 p-5 pt-3">
            <h3 class="card__title text-xl leading-snug font-bold">{{ title }}</h3>
            <ul class="flex flex-wrap gap-2">
                <li v-for="skill in skills" :key="skill">
                    <span
                        class="block rounded-full border border-line px-2.5 py-0.5 text-sm text-muted transition-colors group-hover:border-primary/40"
                        >{{ skill }}</span
                    >
                </li>
            </ul>
        </div>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    skills: string[];
}>();

const angles = [135, 215, 160, 300];
const gradient = computed(() => {
    const angle = angles[props.title.length % angles.length];
    return `linear-gradient(${angle}deg, var(--color-primary) 0%, color-mix(in oklab, var(--color-primary) 35%, var(--color-ink)) 45%, var(--color-ink) 100%)`;
});
</script>
