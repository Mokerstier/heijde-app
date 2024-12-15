<template>
    <section class="container">
        <Header
            prefix="/"
            title="projects"
            sub-title="An overview of my most recent projects"></Header>
    </section>
    <section class="container grid gap-2 lg:grid-cols-3">
        <article class="flex flex-col items-center border border-gray p-2" v-for="repo in data">
            <span>{{ repo.name }}</span>
            <span>{{ repo.description }}</span>
            <span>{{ repo.language }}</span>
            <Button :as-link="true" v-if="repo.homepage" variant="primary" :to="repo.homepage"
                >Live</Button
            >
        </article>
    </section>
</template>
<script lang="ts" setup>
const { data } = await useFetch('api/github');
const languages = async (url: string) => {
    const response = await useFetch(url);
    console.log(response.data);
    return Object.keys(response.data);
};
</script>
