<template>
    <VitePwaManifest />
    <NuxtLayout>
        <!-- Page transitions use GSAP hooks, which can't live in nuxt.config. -->
        <NuxtPage :transition="pageTransition" />
    </NuxtLayout>
    <PageTransitionOverlay />
</template>
<script lang="ts" setup>
const pageTransition = usePageTransition();
</script>
