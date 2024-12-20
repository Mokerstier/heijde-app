<template>
    <div>
        <section class="container">
            <HeaderBlock
                prefix="/"
                title="projects"
                sub-title="An overview of my most recent projects"></HeaderBlock>
        </section>
        <section class="mt- container grid gap-2 lg:grid-cols-3">
            <article
                class="flex flex-col items-center border border-gray p-2"
                v-for="(repo, index) in data">
                <span>{{ repo.name }}</span>
                <span>{{ repo.description }}</span>
                <!-- <PieChart :data="repo.languages" /> -->
                <ClusterChart v-if="!isObjectEmpty(repo.languages)" :data="repo.languages" />
                <Button :as-link="true" v-if="repo.homepage" variant="primary" :to="repo.homepage"
                    >Github Link</Button
                >
            </article>
        </section>
    </div>
</template>
<script lang="ts" setup>
import PieChart from '~/components/charts/PieChart.vue';
import type { RepoOutline } from '~/types/Repo';

const data = await useFetchWithCache<RepoOutline[]>('/api/github');

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

