<template>
    <div
        id="main-nav"
        ref="mainNav"
        class="fixed inset-x-0 top-0 z-50 border-b bg-ink/95 transition-colors"
        :class="{
            'border-b-line/75 delay-500': menuIsOpen,
            'border-b-ink delay-0': !menuIsOpen,
        }">
        <nav class="container pb-2 pt-4 lg:pt-8">
            <ul class="flex items-center gap-x-8">
                <li>
                    <NuxtLink class="flex items-center gap-x-3" to="/" @pointerenter="onLogoEnter">
                        <span ref="logoWrap" class="relative flex h-10 w-10 items-center justify-center">
                            <ClientOnly>
                                <LazyNavLogo class="absolute inset-0 h-full w-full" />
                                <template #fallback>
                                    <NuxtImg class="h-4 w-4" src="W-logo-light.svg" />
                                </template>
                            </ClientOnly>
                        </span>
                        Wouter
                    </NuxtLink>
                </li>
                <li
                    v-for="link in routes"
                    :key="link.label"
                    ref="items"
                    class="group relative hidden md:block [&:nth-child(2)]:ml-auto">
                    <Button
                        :as-link="true"
                        variant="navigation"
                        active-class="active"
                        class="group text-muted"
                        :class="isNestedActive(link.to)"
                        :to="link.to">
                        <span>
                            <span class="group-hover:text-primary group-[.active]:text-primary"
                                >#</span
                            >{{ link.label }}
                        </span>
                    </Button>
                </li>
                <li class="ml-auto block md:hidden">
                    <button
                        @click="toggleMenu"
                        :aria-label="
                            menuIsOpen ? 'close the naviagtion menu' : 'open navigation menu'
                        "
                        class="flex h-full flex-col items-center justify-center gap-y-[5px]">
                        <span
                            class="button__menu button__menu--top h-[2px] w-6 bg-white transition-all"
                            :class="{ 'translate-y-[0.4rem] rotate-45': menuIsOpen }"></span>
                        <span
                            class="button__menu button__menu--mid ml-auto h-[2px] w-4 bg-white transition-all"
                            :class="{ 'opacity-0': menuIsOpen }"></span>
                        <span
                            class="button__menu button__menu--bot h-[2px] w-6 bg-white transition-all"
                            :class="{ '-translate-y-2 -rotate-45': menuIsOpen }"></span>
                    </button>
                </li>
            </ul>
            <MobileNavigation :menu-is-open="menuIsOpen" />
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { burst } from '~/utils/lightning';

const route = useRoute();
const routes = useNavigation();

const menuIsOpen = ref(false);
const mainNav = ref<HTMLElement | null>(null);
const logoWrap = ref<HTMLElement | null>(null);

const navigationLinksRef = useTemplateRef('items');

const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
};

const isNestedActive = (to: string) => {
    const root = to.split('/')[1];
    const current = route.fullPath.split('/')[1];
    return root === current ? 'active' : '';
};

watch(
    () => route.fullPath,
    () => {
        menuIsOpen.value = false;
    }
);

watch(
    () => menuIsOpen.value,

    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
);

// Hovering the logo shoots a ring of small bolts out of it (mouse/pen only, and not
// again while the previous ring is still firing).
let bursting = false;
const onLogoEnter = (event: PointerEvent) => {
    if (bursting || event.pointerType === 'touch' || !logoWrap.value) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    bursting = true;
    burst(logoWrap.value)?.eventCallback('onComplete', () => (bursting = false));
};

onMounted(() => {

    document.documentElement.style.setProperty(
        '--nav-height',
        `${mainNav.value?.getBoundingClientRect().height ?? 48 + 1}px`
    );

    window.addEventListener('resize', () => {
        document.documentElement.style.setProperty(
            '--nav-height',
            `${mainNav.value?.getBoundingClientRect().height ?? 48 + 1}px`
        );
    });

    animateNavigation(navigationLinksRef.value);
});
</script>
