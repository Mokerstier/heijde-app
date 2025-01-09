<template>
    <article class="border border-gray p-4">
        <a :href="`/blogs/${blog.slug}`" class="mb-4 block">
            <HeaderBlock :title="blog.title" :sub-title="blog.description" />
        </a>
        <div class="flex flex-wrap gap-y-3">
            <Pill
                :key="tag + blog.title"
                :class="{ 'border-white text-white': activeFilters.includes(tag) }"
                @click="emit('updateFilter', tag)"
                v-for="tag in blog.tags"
                >{{ tag }}</Pill
            >
        </div>
    </article>
</template>
<script lang="ts" setup>
import type { BlogOutline } from '~/server/models/blog.model';

defineProps<{
    blog: BlogOutline;
    activeFilters: string[];
}>();

const emit = defineEmits<{
    (e: 'updateFilter', value: string): void;
}>();
</script>

<style scoped lang="scss">
article {
    & span {
        @apply line-clamp-4;
    }
}
</style>
