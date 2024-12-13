<template>
    <nav class="container pb-2 pt-8">
        <ul class="flex gap-x-8">
            <li>
                <NuxtLink class="flex items-center gap-x-4" to="/">
                    <NuxtImg class="h-4 w-4" src="W-logo-light.svg" /> Wouter
                </NuxtLink>
            </li>
            <li class="ml-auto">
                <NuxtLink active-class="text-white" class="text-gray underline-animation" to="/"
                    ><span class="text-primary">#</span>home</NuxtLink
                >
            </li>
            <li>
                <NuxtLink
                    active-class="text-white"
                    class="text-gray underline-animation"
                    to="/projects"
                    ><span class="text-primary">#</span>projects</NuxtLink
                >
            </li>
            <li>
                <NuxtLink
                    active-class="text-white"
                    class="text-gray underline-animation"
                    to="/about"
                    ><span class="text-primary">#</span>about</NuxtLink
                >
            </li>
            <li>
                <NuxtLink
                    active-class="text-white"
                    class="text-gray underline-animation"
                    to="/contact"
                    ><span class="text-primary">#</span>contact</NuxtLink
                >
            </li>
        </ul>
    </nav>
</template>
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
