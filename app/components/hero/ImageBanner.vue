<template>
    <section class="container absolute left-[10%] w-[80%] p-0">
        <div class="flex justify-center">
            <NuxtImg
                :src="src"
                :alt="alt || 'Banner Image'"
                class="-z-10 h-80 w-full object-cover bg-blend-multiply brightness-50" />
        </div>
    </section>
</template>
<script lang="ts" setup>
interface BannerProps {
    src: string;
    alt?: string;
}
const { src, alt } = defineProps<BannerProps>();
</script>
