<template>
    <div>
        <HomeHero />
        <section class="container">
            <Quote></Quote>
        </section>
        <section class="container">
            <Header
                title="skills"
                :show-border="true"
                sub-title="A grasp of the tools I'm familiar with"></Header>
            <div class="mt-3 grid gap-14 lg:grid-cols-2">
                <div>
                    <SvgComponent class="h-full w-full" icon="visual" />
                </div>
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="flex flex-col gap-4">
                        <SkillCard
                            title="Languages"
                            :skills="['Typescript', 'Javascript', 'C++']" />
                        <SkillCard
                            title="Frontend"
                            :skills="['Vue.js', 'Nuxt.js', 'TailwindCSS', 'HTML', 'CSS']" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <SkillCard
                            title="Backend"
                            :skills="['Node.js', 'Express.js', 'MongoDB', 'REST API']" />
                        <SkillCard
                            title="Tools"
                            :skills="['Git', 'GitHub', 'VS-Code', 'Figma', 'Sketch']" />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
useHead({
    title: 'Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content:
                'Wouter van der Heijde is a front-end developer who builds accesible user experiences, that adds value to your business',
        },
    ],
});
</script>
