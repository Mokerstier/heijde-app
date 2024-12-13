<template>
    <aside class="aside text-gray absolute left-0 top-0 hidden p-4 md:block">
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
    <MainNavigation />
    <slot />
    <MainFooter />
</template>
<style>
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
