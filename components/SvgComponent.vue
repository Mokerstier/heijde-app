<template>
    <component :is="icon" v-if="icon" :class="props.class" />
</template>

<script setup lang="ts">
const icons = [
    'email',
    'Dots',
    'Github',
    'Landmark',
    'Linkedin',
    'w-logo-outline',
    'visual',
    'quote',
] as const;

export type Icon = (typeof icons)[number];

const props = defineProps<{
    icon: Icon;
    class?: string[] | string;
}>();

function isIcon(icon: string): icon is Icon {
    return icons.includes(icon as Icon);
}

const icon = computed<Component | undefined>(() => {
    if (!isIcon(props.icon)) {
        return;
    }
    return defineAsyncComponent<Component>(
        async () => (await import(`@/assets/icons/${props.icon}.svg`)) as Component
    );
});
</script>
