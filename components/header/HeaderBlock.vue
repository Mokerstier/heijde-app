<template>
    <header class="flex items-center gap-x-4">
        <h2 class="relative inline text-xl lg:text-3xl">
            <span class="text-primary">{{ prefix ?? '#' }}</span
            >{{ title }}
        </h2>
        <span v-if="showBorder" class="animate-border h-[1px] w-full bg-primary" />
        <NuxtLink v-if="link" :to="link.url" class="ml-auto">{{ link.label }}</NuxtLink>
    </header>
    <span v-if="subTitle" class="mt-3 block text-gray">{{ subTitle }}</span>
</template>
<script lang="ts" setup>
export type Header = {
    alias?: string;
    title: string;
    prefix?: string;
    link?: {
        url: string;
        label: string;
    };
    showBorder?: boolean;
    subTitle?: string;
};

defineProps<Header>();
</script>
<style scoped lang="scss">
.animate-border {
    background-image: linear-gradient(
        to left,
        #54d389,
        #54d389 45%,
        #ffffff 50%,
        #54d389 55%,
        #54d389
    );
    background-size: 250%;
    animation: background-shift 5s infinite;
}

@keyframes background-shift {
    0% {
        background-position: 100%;
    }
    100% {
        background-position: 0%;
    }
}
</style>
