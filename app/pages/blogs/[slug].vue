<template>
    <div ref="root">
        <header
            id="blog-hero"
            class="relative isolate flex min-h-[55vh] items-end overflow-hidden border-b border-line bg-ink">
            <!-- Duotone image: greyscale photo blended over the brand blue, fading into the page. -->
            <div v-if="blog.image" class="absolute inset-0 -z-30 bg-primary">
                <NuxtImg
                    :src="blog.image"
                    :alt="blog.title"
                    class="hero-image absolute -top-[8%] left-0 h-[116%] w-full object-cover mix-blend-multiply contrast-125 grayscale" />
            </div>
            <div
                v-else
                class="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_20%_20%,var(--color-primary),transparent_55%),radial-gradient(circle_at_85%_75%,var(--color-accent),transparent_45%)] opacity-60" />
            <div
                class="absolute inset-0 -z-20 bg-linear-to-t from-ink via-ink/70 to-ink/10" />
            <div
                class="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(var(--color-paper)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />

            <div class="container relative max-w-3xl pb-10 pt-32">
                <div class="hero-tags mb-4 flex flex-wrap gap-2">
                    <Pill
                        v-for="tag in blog.tags"
                        :key="tag"
                        class="border-paper/30 bg-ink/50 backdrop-blur-sm"
                        >{{ tag }}</Pill
                    >
                </div>
                <h1 ref="title" class="text-4xl leading-tight font-bold lg:text-6xl">
                    <span class="text-primary">#</span>{{ blog.title }}
                </h1>
                <p v-if="blog.description" class="hero-desc mt-4 max-w-xl text-lg text-muted">
                    {{ blog.description }}
                </p>
            </div>
        </header>
        <section class="container max-w-3xl">
            <Markdown :content="blog.content" />
        </section>
    </div>
</template>
<script lang="ts" setup>
import { useRequestEvent } from '#app';
import { SplitText } from 'gsap/SplitText';
const { params } = useRoute();
const blog = await useFetchWithCache<IBlog>(`/api/blog/${params.slug}`);

const root = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);

// Hero intro (delayed until the card-to-hero transition has revealed it) plus a slow
// parallax drift on the image while the hero scrolls away.
useGsap(root, ({ gsap, reducedMotion }) => {
    if (reducedMotion || !title.value) return;

    const split = SplitText.create(title.value, { type: 'lines,words', mask: 'lines', aria: 'auto' });

    gsap.timeline({ delay: 0.35, defaults: { ease: 'power4.out' } })
        .from('.hero-image', { scale: 1.15, duration: 1.6, ease: 'power2.out' }, 0)
        .from(split.words, { yPercent: 110, duration: 0.9, stagger: 0.05 }, 0)
        .from('.hero-tags', { autoAlpha: 0, y: 16, duration: 0.6 }, 0.1)
        .from('.hero-desc', { autoAlpha: 0, y: 16, duration: 0.7 }, 0.35);

    gsap.to('.hero-image', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '#blog-hero', start: 'top top', end: 'bottom top', scrub: true },
    });
});

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
