<template>
    <article
        class="col-auto flex max-h-max flex-grow-0 flex-col border border-gray py-2 shadow hover:border-white hover:shadow-lg hover:shadow-primary">
        <h3 class="card__title border-b border-b-gray px-2 pb-2">{{ title }}</h3>
        <ul class="flex flex-wrap gap-3 px-2 pt-2 text-gray">
            <li v-for="skill in skills" :key="skill">{{ skill }}</li>
        </ul>
    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    skills: string[];
}>();
</script>
<style scoped lang="scss">
li:not(:last-child) {
    &::after {
        content: '•';
        @apply ml-3;
    }
}
</style>
