<template>
    <article
        class="project-card group relative flex min-h-[400px] flex-col overflow-hidden border border-line bg-surface/85 text-left shadow-[0_30px_70px_-40px_var(--color-primary),inset_0_1px_0_rgb(255_255_255/0.07)] transition-[border-color,box-shadow] duration-300 focus-within:border-primary hover:border-primary hover:shadow-[0_18px_40px_-18px_var(--color-primary)] md:flex-row"
        :class="{ 'is-expanded': expanded }"
        :data-flip-id="repo.name">
        <div class="flex flex-col" :class="expanded ? 'md:w-[418px] md:shrink-0' : 'w-full'">
            <!-- Duotone cover, matching the blog cards. -->
            <div class="relative aspect-video overflow-hidden bg-primary">
                <NuxtImg
                    v-if="repo.image"
                    :src="repo.image"
                    :alt="repo.name"
                    loading="lazy"
                    class="absolute inset-0 h-full w-full object-cover mix-blend-multiply contrast-125 grayscale transition-transform duration-700 ease-out group-hover:scale-110" />
                <div v-else class="absolute inset-0 bg-ink" :style="{ backgroundImage: fallbackGradient }" />
                <div
                    v-if="!repo.image"
                    class="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-paper)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]" />
                <span
                    v-if="!repo.image"
                    class="absolute right-4 bottom-3 font-mono text-6xl leading-none font-bold tracking-tighter text-paper/10 transition-transform duration-500 group-hover:-translate-y-2"
                    aria-hidden="true"
                    >&lt;/&gt;</span
                >
                <div
                    class="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
            </div>

            <div class="relative flex flex-1 flex-col gap-3 p-5">
                <ul v-if="topLanguages.length" class="flex flex-wrap gap-2">
                    <li v-for="lang in topLanguages" :key="lang">
                        <span
                            class="block rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold tracking-wide text-muted uppercase"
                            >{{ lang }}</span
                        >
                    </li>
                    <li v-if="extraLanguages" class="self-center text-xs text-muted">
                        +{{ extraLanguages }}
                    </li>
                </ul>

                <h3 class="text-xl leading-snug font-bold lg:text-2xl">{{ repo.name }}</h3>
                <p class="line-clamp-3 text-muted">{{ repo.description }}</p>

                <div class="mt-auto flex items-center justify-between gap-3 pt-2">
                    <NuxtLink
                        v-if="repo.homepage"
                        :to="repo.homepage"
                        target="_blank"
                        :title="`Visit ${repo.name}`"
                        class="flex items-center gap-2 text-sm font-semibold text-primary">
                        View on GitHub
                        <span class="transition-transform duration-300 group-hover:translate-x-2"
                            >→</span
                        >
                    </NuxtLink>
                    <button
                        v-if="!isObjectEmpty(repo.languages)"
                        type="button"
                        class="ml-auto rounded-full border border-line px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors hover:border-primary hover:text-primary"
                        :aria-expanded="expanded"
                        @click="emit('toggle')">
                        {{ expanded ? 'Close' : 'Languages' }}
                    </button>
                </div>
            </div>
        </div>

        <div
            v-if="expanded"
            class="relative flex min-h-[340px] flex-1 items-center justify-center border-t border-line md:border-t-0 md:border-l">
            <div class="relative h-[340px] w-[300px]">
                <ClientOnly fallback-tag="span" fallback="Loading language data...">
                    <ClusterChart
                        :width="300"
                        :height="300"
                        translate="translate(150, 150)"
                        :data="repo.languages" />
                </ClientOnly>
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
import type { RepoOutline } from '~/types/Repo';

const props = defineProps<{
    repo: RepoOutline;
    expanded: boolean;
}>();

const emit = defineEmits<{
    toggle: [];
}>();

// Languages ordered by bytes written; the card shows the biggest two.
const sortedLanguages = computed(() =>
    Object.entries(props.repo.languages ?? {})
        .sort(([, a], [, b]) => b - a)
        .map(([name]) => name)
);
const topLanguages = computed(() => sortedLanguages.value.slice(0, 2));
const extraLanguages = computed(() => Math.max(0, sortedLanguages.value.length - 2));

const angles = [135, 215, 160, 300];
const fallbackGradient = computed(() => {
    const angle = angles[props.repo.name.length % angles.length];
    return `linear-gradient(${angle}deg, var(--color-primary) 0%, color-mix(in oklab, var(--color-primary) 35%, var(--color-ink)) 45%, var(--color-ink) 100%)`;
});
</script>
