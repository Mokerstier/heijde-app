<template>
    <span
        :class="class"
        class="mr-2 inline-block max-w-max cursor-pointer rounded-full border border-gray bg-slate px-3 py-1 text-sm font-semibold capitalize text-gray transition-colors hover:border-white hover:text-white">
        <slot />
    </span>
</template>
<script lang="ts" setup>
defineProps<{
    class?: string | (string | { [key: string]: boolean })[];
}>();
</script>

