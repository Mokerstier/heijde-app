<template>
    <Transition :css="false" @enter="onEnter" @leave="onLeave">
        <nav v-if="menuIsOpen" class="menu">
            <ul class="flex flex-col gap-8">
                <li v-for="route in routes" :key="route.label" class="menu-link">
                    <Button
                        :as-link="true"
                        variant="secondary"
                        active-class="active"
                        class="underline-animation font-display text-4xl text-muted"
                        :to="route.to">
                        <span> <span class="text-primary">#</span>{{ route.label }} </span>
                    </Button>
                </li>
            </ul>
            <ul class="menu-social mt-auto flex justify-center text-muted">
                <li>
                    <NuxtLink
                        class="transition-colors duration-300 hover:text-primary"
                        title="Take a look at my github"
                        to="https://github.com/Mokerstier">
                        <SvgComponent class="h-16 w-16" icon="Github"></SvgComponent>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        class="transition-colors duration-300 hover:text-primary"
                        title="Take a look at my linkedin"
                        to="https://nl.linkedin.com/in/wouter-van-der-heijde-610695175">
                        <SvgComponent class="h-16 w-16" icon="Linkedin"></SvgComponent>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </Transition>
</template>
<script setup lang="ts">
import gsap from 'gsap';

const routes = useNavigation();

const props = defineProps<{
    menuIsOpen: boolean;
}>();

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Overlay wipes open from the top, then the links and socials stagger in.
const onEnter = (el: Element, done: () => void) => {
    if (prefersReducedMotion()) return done();
    gsap.timeline({ onComplete: done })
        .fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0)' },
            { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
        )
        .from(
            el.querySelectorAll('.menu-link'),
            { autoAlpha: 0, x: -48, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
            '-=0.25'
        )
        .from(el.querySelector('.menu-social'), { autoAlpha: 0, y: 16, duration: 0.4 }, '<0.2');
};

const onLeave = (el: Element, done: () => void) => {
    if (prefersReducedMotion()) return done();
    gsap.killTweensOf([el, ...el.querySelectorAll('.menu-link, .menu-social')]);
    gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: done,
    });
};
</script>
<style scoped>
@reference '~/assets/css/main.css';
.menu {
    @apply absolute left-0 right-0 top-[calc(100%+1px)] z-50 flex h-[calc(100vh-var(--nav-height))] min-h-full w-full flex-col bg-ink px-4 pb-8 pt-12;
}

</style>
