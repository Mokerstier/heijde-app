<template>
    <Transition name="fade">
        <article
            v-if="
                activeFilters.length === 0 ||
                blog.tags.some((tag) => activeFilters.includes(tag.toLowerCase()))
            "
            ref="card"
            class="blog-card group relative flex flex-col overflow-hidden border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 focus-within:border-primary hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-18px_var(--color-primary)]">
            <!-- Duotone cover: same treatment as the detail hero, so the morph feels continuous. -->
            <div class="relative aspect-video overflow-hidden bg-primary">
                <NuxtImg
                    v-if="blog.image"
                    :src="blog.image"
                    :alt="blog.title"
                    loading="lazy"
                    class="absolute inset-0 h-full w-full object-cover mix-blend-multiply contrast-125 grayscale transition-transform duration-700 ease-out group-hover:scale-110" />
                <!-- No cover image: a brand gradient (angle varies per post) with a dot grid. -->
                <div v-else class="absolute inset-0 bg-ink" :style="{ backgroundImage: fallbackGradient }" />
                <div
                    v-if="!blog.image"
                    class="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-paper)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_right,black,transparent_70%)]" />
                <span
                    v-if="!blog.image"
                    class="absolute right-4 bottom-1 font-display text-8xl leading-none font-bold text-paper/10 transition-transform duration-500 group-hover:-translate-y-2"
                    aria-hidden="true"
                    >#</span
                >
                <div
                    class="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
            </div>

            <div class="relative flex flex-1 flex-col gap-3 p-5">
                <ul v-if="blog.tags.length" class="relative z-10 flex flex-nowrap gap-2 overflow-hidden">
                    <li v-for="tag in blog.tags.slice(0, 2)" :key="tag + blog.title" class="min-w-0">
                        <button
                            type="button"
                            class="block max-w-full truncate rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase transition-colors"
                            :class="
                                activeFilters.includes(tag.toLowerCase())
                                    ? 'border-primary bg-primary/15 text-primary'
                                    : 'border-line text-muted hover:border-paper hover:text-paper'
                            "
                            :aria-pressed="activeFilters.includes(tag.toLowerCase())"
                            @click="emit('updateFilter', tag)">
                            {{ tag }}
                        </button>
                    </li>
                    <li v-if="blog.tags.length > 2" class="shrink-0 self-center text-xs text-muted">
                        +{{ blog.tags.length - 2 }}
                    </li>
                </ul>

                <h3 class="text-xl leading-snug font-bold lg:text-2xl">
                    <!-- Stretched link: the whole card is clickable, the tag buttons stay above it. -->
                    <NuxtLink
                        :to="`/blogs/${blog.slug}`"
                        class="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                        @click="onOpen">
                        {{ blog.title }}
                    </NuxtLink>
                </h3>
                <p class="line-clamp-3 text-muted">{{ blog.description }}</p>

                <span
                    class="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary"
                    aria-hidden="true">
                    Read article
                    <span class="transition-transform duration-300 group-hover:translate-x-2"
                        >→</span
                    >
                </span>
            </div>
        </article>
    </Transition>
</template>
<script lang="ts" setup>
import type { BlogOutline } from '#shared/models/blog.model';

const props = defineProps<{
    blog: BlogOutline;
    activeFilters: string[];
}>();

const angles = [135, 215, 160, 300];
const fallbackGradient = computed(() => {
    const angle = angles[props.blog.slug.length % angles.length];
    return `linear-gradient(${angle}deg, var(--color-primary) 0%, color-mix(in oklab, var(--color-primary) 35%, var(--color-ink)) 45%, var(--color-ink) 100%)`;
});

const emit = defineEmits<{
    (e: 'updateFilter', value: string): void;
}>();

const card = ref<HTMLElement | null>(null);

// Let the page transition grow this card into the detail page (skipped for
// open-in-new-tab clicks, which don't navigate this window).
const onOpen = (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !card.value) return;
    rememberBlogMorph(card.value);
};
</script>
