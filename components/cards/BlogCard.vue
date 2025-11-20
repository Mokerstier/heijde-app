<template>
    <Transition name="fade">
        <article
            v-if="
                activeFilters.length === 0 ||
                blog.tags.some((tag) => activeFilters.includes(tag.toLowerCase()))
            "
            class="relative flex min-h-[250px] flex-col gap-4 border border-gray bg-slate p-4 transition-all hover:border-white">
            <div
                ref="tagContainer"
                class="absolute left-0 top-0 z-10 flex max-h-[50px] w-full flex-wrap gap-y-2 overflow-hidden border-b border-gray bg-slate px-4 py-4 transition-all"
                @mouseenter="handleEnter"
                @mouseleave="handleLeave">
                <p class="flex w-full flex-wrap"><span class="text-primary">#</span>subjects</p>
                <Pill
                    :key="tag + blog.title"
                    :class="[
                        {
                            'text-primary': activeFilters.includes(tag.toLowerCase()),
                        },
                        'border-none',
                        '!px-0',
                    ]"
                    @click="emit('updateFilter', tag)"
                    v-for="tag in blog.tags"
                    >{{ tag }}</Pill
                >
            </div>
            <NuxtLink :to="`/blogs/${blog.slug}`" class="mb-4 block pt-[50px]">
                <HeaderBlock :trim="true" :title="blog.title" :sub-title="blog.description" />
            </NuxtLink>
        </article>
    </Transition>
</template>
<script lang="ts" setup>
import type { BlogOutline } from '~/server/models/blog.model';

defineProps<{
    blog: BlogOutline;
    activeFilters: string[];
}>();

const { viewportSize } = useViewportSize();

const tagContainer = ref<HTMLElement | null>(null);
const maxContainerHeight = ref<string>('');

const handleEnter = () => {
    if (tagContainer.value) {
        tagContainer.value.style.maxHeight = maxContainerHeight.value;
    }
};
const handleLeave = () => {
    if (tagContainer.value) {
        tagContainer.value.style.maxHeight = '50px';
    }
};

const emit = defineEmits<{
    (e: 'updateFilter', value: string): void;
}>();

watch(
    viewportSize,
    () => {
        maxContainerHeight.value = `${tagContainer?.value?.scrollHeight ?? '' + 16}px`;
    },
    { immediate: true }
);

onMounted(() => {
    if (tagContainer.value) {
        maxContainerHeight.value = `${tagContainer.value.scrollHeight + 16}px`;
    }
});
</script>

<style scoped lang="scss">
article {
    & span {
        @apply line-clamp-4;
    }
}
</style>
