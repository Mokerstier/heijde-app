<template>
    <section class="container max-w-3xl">
        <ImageBanner :src="blog.image" :alt="blog.title" />
        <HeaderBlock prefix="#" :title="blog.title" :sub-title="blog.description" />
        <div class="mb-6 flex flex-wrap gap-y-2">
            <Pill :class="['border-none !px-0']" :key="tag" v-for="tag in blog.tags">{{
                tag
            }}</Pill>
        </div>
        <Markdown :content="blog.content" />
    </section>
</template>
<script lang="ts" setup>
import { useRequestEvent } from '#app';
const { params } = useRoute();
const blog = await useFetchWithCache<IBlog>(`/api/blog/${params.slug}`);

const blogUrl = process.client
    ? `${window.location.origin}/blogs/${params.slug}`
    : (() => {
          const event = useRequestEvent();
          const protocol = event?.req.headers['x-forwarded-proto'] || 'http';
          const host = event?.req.headers['host'] || 'localhost:3000';
          return `${protocol}://${host}/blogs/${params.slug}`;
      })();

useHead({
    title: blog.value.title, // Sets the page title
    meta: [
        {
            name: 'description',
            content: blog.value.description, // Meta description for SEO
        },
        {
            property: 'og:title',
            content: blog.value.title, // Open Graph title for social sharing
        },
        {
            property: 'og:description',
            content: blog.value.description, // Open Graph description for social sharing
        },
        {
            property: 'og:image',
            content: blog.value.image || '/default-image.jpg', // Open Graph image (use a default if none exists)
        },
        {
            property: 'og:url',
            content: blogUrl, // Open Graph URL
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image', // Twitter card type
        },
        {
            name: 'twitter:title',
            content: blog.value.title, // Twitter title
        },
        {
            name: 'twitter:description',
            content: blog.value.description, // Twitter description
        },
        {
            name: 'twitter:image',
            content: blog.value.image || '/default-image.jpg', // Twitter image
        },
    ],
});
</script>

<!-- Image prompt
Create an illustration for this article:
Use a clean, minimalistic style with soft pastel colors, smooth gradients, and abstract geometric shapes. 
The illustration should feel modern, editorial, and professional, with a friendly and approachable vibe. 
Avoid excessive detail or realism; focus on clear shapes and a cohesive composition that complements written content. -->
