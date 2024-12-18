<template>
    <div>
        <HomeHero />
        <section class="container">
            <Quote></Quote>
        </section>
        <SkillBlock :components="data.template.components.SkillBlock" />
    </div>
</template>
<script lang="ts" setup>
import { usePageData } from '~/composables/usePageData';

const data = await usePageData('home');
console.log(data.value.template);
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
