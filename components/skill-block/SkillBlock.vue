<template>
    <section class="container">
        <Header
            :title="header.title"
            :show-border="header.showBorder"
            :sub-title="header.subTitle"></Header>
        <div class="relative mt-3 grid gap-14 lg:grid-cols-2">
            <div class="absolute bottom-0 left-0 -z-10 h-full w-full lg:static">
                <SvgComponent class="h-full w-full" :icon="visual.icon" />
            </div>
            <div class="grid items-center gap-4 md:grid-cols-2">
                <div class="flex flex-col gap-4">
                    <SkillCard title="Languages" :skills="['Typescript', 'Javascript', 'C++']" />
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
</template>
<script lang="ts" setup>
const props = defineProps<{
    components: [];
}>();
console.log(props);
const { header, visual, cards } = props.components;
</script>
