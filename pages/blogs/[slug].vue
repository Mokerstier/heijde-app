<template>
    <section class="container">
        <div class="mb-6">
            <Pill :key="tag" v-for="tag in blog.tags">{{ tag }}</Pill>
        </div>
        <HeaderBlock prefix="#" :title="blog.title" :sub-title="blog.description" />
        <Markdown :content="blog.content" />
    </section>
</template>
<script lang="ts" setup>
const { params } = useRoute();
const blog = await useFetchWithCache<IBlog>(`/api/blog/${params.slug}`);
</script>
