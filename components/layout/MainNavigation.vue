<template>
    <nav class="container pb-2 pt-8">
        <ul class="flex gap-x-8">
            <li>
                <NuxtLink class="flex items-center gap-x-4" to="/">
                    <NuxtImg class="h-4 w-4" src="W-logo-light.svg" /> Wouter
                </NuxtLink>
            </li>
            <li class="ml-auto hidden md:block">
                <NuxtLink active-class="text-white" class="underline-animation text-gray" to="/"
                    ><span class="text-primary">#</span>home</NuxtLink
                >
            </li>
            <li class="hidden md:block">
                <NuxtLink
                    active-class="text-white"
                    class="underline-animation text-gray"
                    to="/projects"
                    ><span class="text-primary">#</span>projects</NuxtLink
                >
            </li>
            <li class="hidden md:block">
                <NuxtLink
                    active-class="text-white"
                    class="underline-animation text-gray"
                    to="/about"
                    ><span class="text-primary">#</span>about</NuxtLink
                >
            </li>
            <li class="hidden md:block">
                <NuxtLink
                    active-class="text-white"
                    class="underline-animation text-gray"
                    to="/contact"
                    ><span class="text-primary">#</span>contact</NuxtLink
                >
            </li>
            <li class="ml-auto block md:hidden">
                <button
                    @click="toggleMenu"
                    :aria-label="menuIsOpen ? 'close the naviagtion menu' : 'open navigation menu'"
                    class="flex h-full flex-col items-center justify-center gap-y-[5px]">
                    <span
                        class="button__menu button__menu--top h-[2px] w-6 bg-gray transition-all"
                        :class="{ 'translate-y-[0.4rem] rotate-45': menuIsOpen }"></span>
                    <span
                        class="button__menu button__menu--mid ml-auto h-[2px] w-4 bg-gray transition-all"
                        :class="{ 'opacity-0': menuIsOpen }"></span>
                    <span
                        class="button__menu button__menu--bot h-[2px] w-6 bg-gray transition-all"
                        :class="{ '-translate-y-2 -rotate-45': menuIsOpen }"></span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const menuIsOpen = ref(false);

const toggleMenu = () => {
    menuIsOpen.value = !menuIsOpen.value;
};
</script>

<style lang="scss">
.underline-animation {
    @apply relative;

    &::after {
        @apply absolute -bottom-1 left-0 h-0.5 w-full bg-primary;
        content: '';
        transform: scaleX(0);
        transform-origin: 0 0;
        transition: transform 0.3s;
    }

    &:hover::after {
        transform: scaleX(1);
    }
}
</style>
