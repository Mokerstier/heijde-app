<template>
    <footer class="border-t border-t-gray">
        <section class="container grid grid-cols-2">
            <div class="flex flex-wrap items-center gap-x-10 gap-y-4">
                <NuxtLink class="flex items-center gap-x-4" to="/">
                    <NuxtImg class="h-4 w-4" src="W-logo-light.svg" /> Wouter
                </NuxtLink>
                <a
                    href="mailto:wouter.van.der.heijde@outlook.com"
                    class="text-gray hover:text-primary"
                    >wouter.van.der.heijde@outlook.com</a
                >
                <span class="block w-full">Father && creative front-end developer</span>
            </div>
            <div class="w-max-w ml-auto">
                <h3 class="text-xl">Socials</h3>
                <ul class="text-gray">
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
            </div>
            <span class="col-span-2 mx-auto mt-12 inline-block text-gray">
                © Copyright 2022. Made by Wouter
            </span>
        </section>
    </footer>
</template>
