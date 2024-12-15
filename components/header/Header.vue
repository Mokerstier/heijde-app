<template>
    <header class="flex items-center gap-x-4">
        <h2 class="relative inline text-xl lg:text-3xl">
            <span class="text-primary">{{ prefix ?? '#' }}</span
            >{{ title }}
        </h2>
        <span v-if="showBorder" class="h-[1px] w-full bg-primary" />
        <NuxtLink v-if="link" :to="link.url" class="ml-auto">{{ link.label }}</NuxtLink>
    </header>
    <span v-if="subTitle" class="mt-3 block text-gray">{{ subTitle }}</span>
</template>
<script lang="ts" setup>
const props = defineProps<{
    title: string;
    prefix?: string;
    link?: {
        url: string;
        label: string;
    };
    subTitle?: string;
    showBorder?: boolean;
}>();
</script>
<style scoped lang="scss">
h2 {
    &::after {
        content: '';
        @apply absolute left-[calc(100%+16px)] top-[19px] lg:w-[200%];
    }
}
</style>
