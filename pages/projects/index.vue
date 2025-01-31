<template>
    <div>
        <section class="container">
            <HeaderBlock
                prefix="/"
                title="projects"
                sub-title="An overview of my most recent projects"></HeaderBlock>
        </section>
        <section class="mt container grid gap-2 lg:grid-cols-3">
            <FlipCard :height="400" v-for="(repo, index) in data">
                <template #front>
                    <article
                        :key="repo.name"
                        ref="repoCard"
                        class="flex h-full flex-col justify-center border border-gray p-4">
                        <NuxtImg
                            v-if="repo.image"
                            :src="repo.image"
                            :alt="repo.name"
                            class="mx-auto mb-4 max-h-48 lg:max-h-none" />
                        <h4 class="text-2xl">{{ repo.name }}</h4>
                        <p>{{ repo.description }}</p>

                        <Button
                            class="mx-auto mt-auto"
                            :as-link="true"
                            v-if="repo.homepage"
                            variant="primary"
                            :to="repo.homepage"
                            >Github Link</Button
                        >
                    </article>
                </template>
                <template #back>
                    <div
                        ref="clusterRefs"
                        class="relative h-full w-full border border-gray bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 from-0% to-transparent to-70%">
                        <Button
                            class="group/button absolute -right-4 top-4 flex max-w-max flex-nowrap items-center justify-start"
                            :as-link="true"
                            v-if="repo.homepage"
                            variant="secondary"
                            :to="repo.homepage"
                            :title="`Visit ${repo.name}`">
                            <SvgComponent
                                class="transition-colors group-hover/button:text-primary"
                                :width="40"
                                :height="40"
                                icon="Github" />
                        </Button>

                        <ClientOnly fallback-tag="span" fallback="Loading language data...">
                            <ClusterChart
                                :width="clusterWidth"
                                :height="clusterWidth"
                                :translate="`translate(${clusterWidth / 2}, ${clusterWidth / 2})`"
                                v-if="!isObjectEmpty(repo.languages)"
                                :data="repo.languages" />
                        </ClientOnly>
                    </div>
                </template>
            </FlipCard>
        </section>
    </div>
</template>
<script lang="ts" setup>
import type { RepoOutline } from '~/types/Repo';
const clusterRefs = ref<HTMLDivElement[] | null>(null);
const clusterWidth = ref<number>(0);

const data = await useFetchWithCache<RepoOutline[]>('/api/github');

const calculateClusterWidth = () => {
    if (clusterRefs.value === null) return;
    const viewportSize = getViewportSize();
    const gap = 8; // Assuming gap-2 is 8px
    const padding = 16; // Assuming p-4 is 16px

    if (clusterRefs.value.length > 0) {
        const containerWidth =
            clusterRefs.value[0].parentElement?.getBoundingClientRect().width || 0;
        const columns =
            viewportSize === 'lg' || viewportSize === 'xl' || viewportSize === 'xxl' ? 3 : 1;
        clusterWidth.value = (containerWidth - (columns - 1) * gap - 2 * padding) / columns;
    }
};

onMounted(async () => {
    await nextTick();
    calculateClusterWidth();
    window.addEventListener('resize', calculateClusterWidth);
});

watch(clusterRefs, calculateClusterWidth);

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

