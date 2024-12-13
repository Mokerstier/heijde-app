<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleLogin">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="creds.email" />
            <label for="password">Password</label>
            <input type="password" id="password" v-model="creds.password" />
            <button type="submit">register</button>
        </form>
    </div>
</template>
<script setup lang="ts">
const creds = reactive({
    email: '',
    password: '',
});

async function handleLogin() {
    console.log('login', creds);
}
</script>
