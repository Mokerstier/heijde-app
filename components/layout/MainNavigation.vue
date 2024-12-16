<template>
    <div
        ref="mainNav"
        class="relative border-b transition-colors"
        :class="{
            'border-b-gray/75 delay-500': menuIsOpen,
            'border-b-slate delay-0': !menuIsOpen,
        }">
        <nav class="container pb-2 pt-4 lg:pt-8">
            <ul class="flex gap-x-8">
                <li>
                    <NuxtLink class="flex items-center gap-x-3" to="/">
                        <NuxtImg class="h-4 w-4" src="W-logo-light.svg" /> Wouter
                    </NuxtLink>
                </li>
                <li v-for="route in routes" class="hidden md:block [&:nth-child(2)]:ml-auto">
                    <Button
                        :as-link="true"
                        variant="secondary"
                        active-class="text-white"
                        class="underline-animation text-gray"
                        :to="route.to">
                        <span> <span class="text-primary">#</span>{{ route.label }} </span>
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
const route = useRoute();

const menuIsOpen = ref(false);
const mainNav = ref<HTMLElement | null>(null);
const routes = useNavigation();
const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
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
});
</script>
