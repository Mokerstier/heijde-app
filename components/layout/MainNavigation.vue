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
                <li
                    v-for="link in routes"
                    :key="link.label"
                    ref="items"
                    class="group relative hidden md:block [&:nth-child(2)]:ml-auto">
                    <Button
                        :as-link="true"
                        variant="navigation"
                        active-class="active"
                        class="group text-gray"
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
            <SvgComponent
                id="lightning-root"
                icon="Electric-line"
                class="pointer-events-none absolute left-1/2 top-0 w-full -translate-x-1/2 -translate-y-1/2 opacity-0" />
            <MobileNavigation :menu-is-open="menuIsOpen" />
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const routes = useNavigation();

const menuIsOpen = ref(false);
const mainNav = ref<HTMLElement | null>(null);

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
<style lang="scss">
.spark {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    opacity: 0.8;
    border-radius: 100%;
}
</style>
