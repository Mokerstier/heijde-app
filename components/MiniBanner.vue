<template>
    <div
        class="absolute bottom-0 left-1/2 z-20 flex w-full -translate-x-1/2 items-center border border-gray bg-slate/80 p-2 backdrop-blur-3xl lg:min-w-fit">
        <span class="mr-2 block h-4 w-4 flex-shrink-0 bg-primary" />
        <p class="flex flex-wrap items-center text-gray lg:whitespace-nowrap">
            <span class="mr-[1em]">
                {{ label }}
            </span>
            <span v-if="highlight" class="block text-white"> {{ highlight }}</span>
        </p>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    label: string;
    highlight?: string;
}>();
</script>
