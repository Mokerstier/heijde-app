<template>
    <section class="container">
        <Header
            prefix="/"
            title="projects"
            sub-title="An overview of my most recent projects"></Header>

        <div class="grid gap-2 lg:grid-cols-3">
            <article
                class="flex flex-col items-center border border-gray p-2"
                v-for="(repo, index) in data">
                <span>{{ repo.name }}</span>
                <span>{{ repo.description }}</span>
                <span v-if="languages[index]">{{ languages[index] }}</span>
                <Button :as-link="true" v-if="repo.homepage" variant="primary" :to="repo.homepage"
                    >Github Link</Button
                >
            </article>
        </div>
    </section>
</template>
<script lang="ts" setup>
import type { RepoOutline } from '~/server/api/github';

const data = await useFetchWithCache<RepoOutline[]>('/api/github');
const languages = ref<string[][]>([]);

const fetchLanguages = async (url: string | null) => {
    if (url === null) return;
    const response = await useFetchWithCache<{ [key: string]: string }>(url);
    return Object.keys(response.value);
};

onMounted(() => {
    languages.value = [];
    data.value?.forEach(async (repo) => {
        languages.value.push((await fetchLanguages(repo.languages_url)) ?? ['']);
    });
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
