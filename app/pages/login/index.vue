<template>
    <section class="container">
        <div class="mx-auto max-w-4xl">
            <h1 class="text-4xl font-bold">Login</h1>
            <form @submit.prevent="handleLogin" class="mt-8 flex flex-col gap-3 text-black">
                <div class="flex flex-col gap-1">
                    <label class="text-muted" for="email">Email</label>
                    <input
                        v-model="credentials.email"
                        class="input-field"
                        type="email"
                        name="email"
                        id="email" />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-muted" for="email">Password</label>
                    <input
                        v-model="credentials.password"
                        class="input-field"
                        type="password"
                        name="password"
                        id="password" />
                </div>
                <Button type="submit" class="btn-primary">Login</Button>
            </form>
        </div>
    </section>
</template>
<script lang="ts" setup>

const { loggedIn, user, fetch: refreshSession } = useUserSession()
const credentials = reactive({
  email: '',
  password: '',
})

const router = useRouter();

const handleLogin = async () => {
    // await authenticateUser(body.value);
    // // redirect to homepage if user is authenticated
    // if (authenticated) {
    //     router.push('/');
    // }
    try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials,
    })

    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/')
  } catch {
    alert('Bad credentials')
  }
};
</script>
<style scoped>
@reference '~/assets/css/main.css';
.input-field {
    @apply p-2 focus:outline-primary;
}
</style>
