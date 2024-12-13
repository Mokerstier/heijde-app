<template>
    <h1>Welcome back: {{ user.name }}</h1>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: function (to, from) {
        const user = User.find();
        console.log(user);
        if (!user) {
            return navigateTo('/login');
        }
    },
});
</script>
