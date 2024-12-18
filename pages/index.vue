<template>
    <div>
        <HomeHero />
        <section class="container">
            <Quote></Quote>
        </section>
        <SkillBlock
            v-bind="
                data.template.find((element) => element.alias === 'SkillBlock') as SkillBlock
            " />
    </div>
</template>
<script lang="ts" setup>
import { usePageData } from '~/composables/usePageData';
import type { SkillBlock } from '~/server/models/page.schema';
const data = await usePageData('home');

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
