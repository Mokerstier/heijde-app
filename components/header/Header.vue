<template>
    <header class="flex">
        <h2 class="relative inline text-xl lg:text-3xl">
            <span class="text-primary">{{ prefix ?? '#' }}</span
            >{{ title }}
        </h2>
        <NuxtLink v-if="link" :to="link.url" class="ml-auto">{{ link.label }}</NuxtLink>
    </header>
</template>
<script lang="ts" setup>
const props = defineProps<{
    title: string;
    prefix?: string;
    link?: {
        url: string;
        label: string;
    };
}>();
</script>
<style scoped lang="scss">
h2 {
    &::after {
        content: '';
        @apply absolute left-[calc(100%+16px)] top-[19px] h-[1px] w-full bg-primary lg:w-[200%];
    }
}
</style>
