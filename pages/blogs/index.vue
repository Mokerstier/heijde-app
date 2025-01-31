<template>
    <section>
        <section class="container !pb-8">
            <HeaderBlock
                prefix="/"
                title="blogs"
                sub-title="Whats on my mind, read all about it here" />
        </section>
        <section class="container sticky top-0 z-20 !py-0">
            <div class="flex flex-wrap items-center gap-y-2 border-b border-gray bg-slate py-2">
                <h3 class="w-full">Filters</h3>
                <Pill
                    @click="() => updateFilter(af)"
                    v-for="af in filters.slice(0, 5)"
                    :class="[
                        {
                            'border-primary text-primary': activeFilters.includes(af.toLowerCase()),
                        },
                    ]"
                    >{{ af }}</Pill
                >
                <Pill
                    v-show="showMoreFilters || activeFilters.includes(af.toLowerCase())"
                    @click="() => updateFilter(af)"
                    v-for="af in filters.slice(5)"
                    :class="[
                        {
                            'border-primary text-primary': activeFilters.includes(af.toLowerCase()),
                        },
                    ]"
                    >{{ af }}</Pill
                >
                <Button
                    v-show="filters.length > 5"
                    variant="secondary"
                    @click="showMoreFilters = !showMoreFilters">
                    {{ !showMoreFilters ? 'Show more' : 'Show less' }}
                </Button>

                <Button
                    v-show="activeFilters.length > 0"
                    variant="primary"
                    @click="activeFilters = []"
                    class="ml-auto">
                    Clear filters
                </Button>
            </div>
        </section>
        <section class="mt container grid gap-2 !pt-8 lg:grid-cols-3">
            <TransitionGroup name="fade">
                <BlogCard
                    v-for="blog in blogsOutline"
                    :blog="blog"
                    @update-filter="updateFilter"
                    :key="blog.slug"
                    :activeFilters="activeFilters" />
            </TransitionGroup>
        </section>
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

const data = await useFetchWithCache<{
    blogsOutline: BlogOutline[];
    filters: string[];
}>('/api/blog');
const { blogsOutline, filters } = data.value;
const activeFilters = ref<string[]>([]);

const showMoreFilters = ref(false);

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

const resetQuery = () => {
    window.history.pushState({}, '', window.location.pathname);
};

watch(activeFilters, () => {
    if (activeFilters.value.length === 0) {
        resetQuery();
        return;
    }
    const tags = activeFilters.value.join(',');
    updateQuery({ tags });
});

onMounted(() => {
    //filter blogs based on query params
    const searchParams = new URLSearchParams(window.location.search);
    const tags = searchParams.get('tags');
    const formattedTags = tags?.split(',') ?? [];
    activeFilters.value = formattedTags;
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

// .fade-move {
//     transition: transform 0.5s;
// }
</style>
