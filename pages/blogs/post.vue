<template>
    <h1>Route needs Authentication</h1>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'auth', // this should match the name of the file inside the middleware directory
});
</script>
