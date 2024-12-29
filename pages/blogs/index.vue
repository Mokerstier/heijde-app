<template>
    <section class="container">
        <HeaderBlock prefix="/" title="blogs" sub-title="Under construction" />
    </section>
    <section class="mt container grid gap-2 lg:grid-cols-3">
        <article v-for="blog in data" class="border border-gray p-4">
            <a :href="`/blogs/${blog.slug}`" class="mb-4 block">
                <HeaderBlock :title="blog.title" :sub-title="blog.description" />
            </a>
            <div class="flex flex-wrap gap-y-3">
                <Pill
                    :key="tag + blog.title"
                    :class="{ 'border-white text-white': activeFilters.includes(tag) }"
                    @click="updateFilter(tag)"
                    v-for="tag in blog.tags"
                    >{{ tag }}</Pill
                >
            </div>
        </article>
    </section>
</template>
<script lang="ts" setup>
import type { BlogOutline } from '~/server/models/blog.model';

useHead({
    title: 'Blogs | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content: 'Read my latest blogs',
        },
    ],
});

const data = await useFetchWithCache<BlogOutline[]>('/api/blog');
const activeFilters = ref<string[]>([]);

const updateFilter = (tag: string) => {
    if (activeFilters.value.includes(tag)) {
        activeFilters.value = activeFilters.value.filter((filter) => filter !== tag);
    } else {
        activeFilters.value = [...activeFilters.value, tag];
    }
};

const updateQuery = (query: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(query)) {
        searchParams.set(key, value);
    }
    window.history.pushState({}, '', `${window.location.pathname}?${searchParams}`);
};

watch(activeFilters, () => {
    const tags = activeFilters.value.join(',');
    updateQuery({ tags });
});
</script>
