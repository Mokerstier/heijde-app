<template>
    <section class="container">
        <HeaderBlock prefix="/" title="blogs" sub-title="Under construction" />
        <form @submit.prevent="submitForm" class="text-black">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    class="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray">Name</label>
                <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    class="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray">Password</label>
                <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    required
                    class="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Submit
            </button>
        </form>
    </section>
</template>
<script lang="ts" setup>
const form = ref({
    email: '',
    name: '',
    password: '',
});

const submitForm = async () => {
    try {
        useFetch('/api/users/', { method: 'POST', body: form.value });
    } catch (error) {
        console.error('Error creating user:', error);
    }
};
</script>
