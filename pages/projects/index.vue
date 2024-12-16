<template>
    <section class="container">
        <Header
            prefix="/"
            title="projects"
            sub-title="An overview of my most recent projects"></Header>

        <div class="grid gap-2 lg:grid-cols-3">
            <article class="flex flex-col items-center border border-gray p-2" v-for="repo in data">
                <span>{{ repo.name }}</span>
                <span>{{ repo.description }}</span>
                <span>{{ repo.language }}</span>
                <Button :as-link="true" v-if="repo.homepage" variant="primary" :to="repo.homepage"
                    >Live</Button
                >
            </article>
        </div>
    </section>
</template>
<script lang="ts" setup>
import type { RepoOutline } from '~/server/api/github';

const { data } = await useFetch<RepoOutline[]>('api/github');
const languages = async (url: string) => {
    const response = await useFetchWithCache(url);
    console.log(response.data);
    return Object.keys(response.data);
};

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

