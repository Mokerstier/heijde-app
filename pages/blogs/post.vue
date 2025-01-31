<template>
    <section class="container">
        <form
            v-if="!loading && !succes"
            @submit.prevent="handleBlogPost"
            class="mr-auto mt-4 flex max-w-4xl flex-col gap-3 text-black lg:mx-auto">
            <h1 class="text-2xl text-white lg:mx-auto">Create a new blog post</h1>
            <div class="mb-4">
                <label for="title" class="block text-sm font-medium text-gray">Title</label>
                <input
                    type="text"
                    id="title"
                    v-model="body.title"
                    required
                    class="border-gray-300 mt-1 block w-full rounded-md p-2 shadow-sm focus:border-indigo-500 focus:outline-primary focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="content" class="block text-sm font-medium text-gray">Content</label>
                <textarea
                    id="content"
                    v-model="body.content"
                    required
                    class="border-gray-300 mt-1 block min-h-40 w-full rounded-md p-2 shadow-sm focus:border-indigo-500 focus:outline-primary focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray"
                    >Description</label
                >
                <textarea
                    id="description"
                    v-model="body.description"
                    required
                    class="border-gray-300 mt-1 block min-h-10 w-full rounded-md p-2 shadow-sm focus:border-indigo-500 focus:outline-primary focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="tags" class="block text-sm font-medium text-gray">Tags</label>
                <input
                    v-for="index in tagCount"
                    type="text"
                    id="tags-{{ index }}"
                    v-model="body.tags[index - 1]"
                    class="border-gray-300 mt-1 block w-full rounded-md p-2 shadow-sm focus:border-indigo-500 focus:outline-primary focus:ring-indigo-500 sm:text-sm" />
                <Button class="mt-4" variant="primary" @click="tagCount = tagCount + 1">
                    Add another tag
                </Button>
            </div>
            <Button class="mt-4" variant="primary" type="submit"> Submit </Button>
        </form>
        <div v-if="loading" class="flex h-[80vh] items-center justify-center">
            <NuxtLoadingIndicator />
        </div>
        <div v-if="succes">
            <Button @click="reloadPage">Make another blog</Button>
        </div>
    </section>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
});

const tagCount = ref(1);
const loading = ref(false);
const succes = ref(false);

const body = ref({
    title: '',
    content: '',
    description: '',
    tags: [''],
});

const handleBlogPost = async () => {
    loading.value = true;
    try {
        body.value.tags = body.value.tags.map((tag) => tag.toLowerCase());
        const { data } = await useFetch('/api/blog', { method: 'POST', body: body.value });
        if (data.value) {
            succes.value = true;
        }
    } catch (error) {
        console.error('Error creating blog:', error);
    } finally {
        loading.value = false;
    }
};

const reloadPage = () => {
    window.location.reload();
};
</script>

