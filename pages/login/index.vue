<template>
    <section class="container">
        <div class="mx-auto max-w-4xl">
            <h1 class="text-4xl font-bold">Login</h1>
            <form @submit.prevent="handleLogin" class="mt-8 flex flex-col gap-3 text-black">
                <div class="flex flex-col gap-1">
                    <label class="text-gray" for="email">Email</label>
                    <input
                        v-model="body.email"
                        class="input-field"
                        type="email"
                        name="email"
                        id="email" />
                </div>
                <div class="flex flex-col gap-1">
                    <label class="text-gray" for="email">Password</label>
                    <input
                        v-model="body.password"
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
import { storeToRefs } from 'pinia';
import { useAuthStore, type UserPayloadInterface } from '~/store/auth';

const { authenticateUser } = useAuthStore();

const { authenticated } = storeToRefs(useAuthStore());
const body = ref<UserPayloadInterface>({ email: '', password: '' });

const router = useRouter();

const handleLogin = async () => {
    await authenticateUser(body.value);
    // redirect to homepage if user is authenticated
    if (authenticated) {
        router.push('/');
    }
};
</script>
<style scoped lang="scss">
.input-field {
    @apply p-2;
}
</style>
