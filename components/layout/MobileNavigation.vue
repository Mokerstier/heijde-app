<template>
    <Transition name="menu">
        <nav v-if="menuIsOpen" class="menu">
            <ul class="flex flex-col gap-8">
                <li v-for="route in routes" class="">
                    <Button
                        :as-link="true"
                        variant="secondary"
                        active-class="active"
                        class="underline-animation text-3xl text-gray"
                        :to="route.to">
                        <span> <span class="text-primary">#</span>{{ route.label }} </span>
                    </Button>
                </li>
            </ul>
            <ul class="mt-auto flex justify-center text-gray">
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
const routes = useNavigation();

const props = defineProps<{
    menuIsOpen: boolean;
}>();
</script>
<style scoped lang="scss">
.menu {
    @apply absolute left-0 right-0 top-[calc(100%+1px)] z-50 flex h-[calc(100vh-var(--nav-height))] min-h-full w-full flex-col bg-slate px-4 pb-8 pt-12;
}

.menu-enter-active,
.menu-leave-active {
    transition: all 0.4s;
}
.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    filter: blur(1rem);
    transform: translateY(-100%);
}
</style>
