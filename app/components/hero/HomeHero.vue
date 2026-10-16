<template>
    <section ref="root" class="container grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <div class="flex flex-col items-start justify-center">
            <h1 class="mb-6 font-display text-4xl lg:mb-12 lg:whitespace-nowrap">
                <span ref="lineStart" class="inline-block">Wouter is</span>
                <span>&nbsp;a{{ article }}&nbsp;</span>
                <span ref="wordEl" class="blink-cursor block min-h-10 max-w-max text-primary lg:inline">{{
                    words[0]
                }}</span>
                <span ref="lineEnd" class="block text-primary">full-stack developer</span>
            </h1>
            <p ref="intro" class="mb-6 text-muted">
                He builds accesible user experiences, that adds value to your business
            </p>
            <Button :as-link="true" to="mailto:wouter.van.der.heijde@outlook.com"
                >Contact me!</Button
            >
        </div>
        <div class="relative z-0 flex items-center justify-center">
            <ClientOnly>
                <LazyHeroScene v-if="showScene" class="pointer-events-none absolute -inset-16 -z-20" />
            </ClientOnly>
            <div ref="photo" class="relative h-[385px] w-[433px] overflow-hidden">
                <NuxtImg
                    class="-mt-4 w-full object-cover"
                    fit="cover"
                    top="0"
                    src="images/hero-img.png"></NuxtImg>
                <MiniBanner label="Currently working on" highlight="Portfolio" />
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import { SplitText } from 'gsap/SplitText';

const words = ['creative', 'passionate', 'dedicated', 'curious', 'enthusiastic'];
const startsWithVowel = (word: string) => 'aeiou'.includes(word.charAt(0));

const root = ref<HTMLElement | null>(null);
const lineStart = ref<HTMLElement | null>(null);
const lineEnd = ref<HTMLElement | null>(null);
const wordEl = ref<HTMLElement | null>(null);
const intro = ref<HTMLElement | null>(null);
const photo = ref<HTMLElement | null>(null);
// three.js is heavy: only start loading it once the main thread is idle.
const showScene = ref(false);
onMounted(() => {
    const start = () => (showScene.value = true);
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
    else setTimeout(start, 500);
});

const article = ref(startsWithVowel(words[0]) ? 'n' : '');

useGsap(root, ({ gsap, reducedMotion }) => {
    // The static copy is already rendered by SSR, so reduced motion simply keeps it.
    if (reducedMotion || !wordEl.value) return;

    const titleSplit = SplitText.create([lineStart.value, lineEnd.value], {
        type: 'lines,chars',
        mask: 'lines',
        aria: 'auto',
    });
    const introSplit = SplitText.create(intro.value, { type: 'words', aria: 'auto' });

    gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from(titleSplit.chars, { yPercent: 110, rotate: 8, duration: 0.9, stagger: 0.025 })
        .from(wordEl.value, { autoAlpha: 0, duration: 0.4 }, '<0.3')
        .from(introSplit.words, { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.04 }, '<0.2')
        .from(photo.value, { clipPath: 'inset(0 0 100% 0)', duration: 1.1 }, 0.1);

    // Cycle the rotating word with a scramble instead of the old typewriter.
    const cycle = gsap.timeline({ repeat: -1, delay: 3 });
    [...words.slice(1), words[0]].forEach((word) => {
        cycle
            .call(() => {
                article.value = startsWithVowel(word) ? 'n' : '';
            })
            .to(wordEl.value, {
                duration: 1,
                scrambleText: { text: word, chars: 'lowerCase', speed: 0.6, revealDelay: 0.2 },
            })
            .to({}, { duration: 2 });
    });
});
</script>
<style>
@reference '~/assets/css/main.css';
.blink-cursor {
    @apply border-r-2 border-primary/75;
    animation: blinkTextCursor 500ms infinite normal;
}
@keyframes blinkTextCursor {
    from {
        border-right-color: color-mix(in oklab, var(--color-primary) 75%, transparent);
    }
    to {
        border-right-color: transparent;
    }
}
</style>
