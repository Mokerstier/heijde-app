<template>
    <div ref="root">
        <!-- ScrollSmoother transforms #smooth-content: keep fixed UI outside it, and use
             ScrollTrigger pins instead of `position: sticky` inside it. -->
        <!-- Fixed nav lives outside #smooth-content: ScrollSmoother transforms that element,
             which would break position: fixed/sticky inside it. -->
        <MainNavigation />
        <aside class="aside m-w-max fixed left-0 top-(--nav-height) z-10 hidden p-4 text-muted md:block">
            <ul>
                <li>
                    <NuxtLink
                        class="transition-colors duration-300 hover:text-primary"
                        title="Take a look at my github"
                        to="https://github.com/Mokerstier">
                        <SvgComponent class="h-8 w-8" icon="Github"></SvgComponent>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink
                        class="transition-colors duration-300 hover:text-primary"
                        title="Take a look at my linkedin"
                        to="https://nl.linkedin.com/in/wouter-van-der-heijde-610695175">
                        <SvgComponent class="h-8 w-8" icon="Linkedin"></SvgComponent>
                    </NuxtLink>
                </li>
            </ul>
        </aside>
        <div id="smooth-wrapper" ref="wrapper">
            <div id="smooth-content" ref="content">
                <div class="pt-(--nav-height)">
                    <slot />
                </div>
                <MainFooter />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ScrollSmoother } from 'gsap/ScrollSmoother';

useHead({
    htmlAttrs: {
        lang: 'en',
    },
});

const root = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

useGsap(root, ({ reducedMotion }) => {
    ScrollSmoother.create({
        wrapper: wrapper.value!,
        content: content.value!,
        smooth: reducedMotion ? 0 : 1.2,
        // Enables data-speed / data-lag parallax attributes on any element.
        effects: !reducedMotion,
        smoothTouch: false,
    });
});
</script>
<style>
@reference '~/assets/css/main.css';
.aside {
    &::before {
        @apply block h-16 lg:h-40;
        content: '';
        width: 2px;
        margin-left: 15px;
        margin-top: -16px;
        background-color: currentColor;
    }
}
</style>
