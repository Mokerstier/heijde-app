<template>
    <section class="container">
        <HeaderBlock
            :title="Header.title ?? ''"
            :show-border="Header.showBorder"
            :sub-title="Header.subTitle"></HeaderBlock>
        <div class="relative mt-3 grid gap-14 lg:grid-cols-2">
            <div class="absolute bottom-0 left-0 -z-10 h-full w-full text-primary lg:static">
                <SvgComponent :class="Visual.class" :icon="Visual.icon" />
            </div>
            <div class="grid items-center gap-4 md:grid-cols-2">
                <div class="flex flex-col gap-4">
                    <SkillCard
                        v-for="card in SkillCards.Cards.slice(0, 2)"
                        :title="card.title"
                        :skills="card.skills" />
                </div>
                <div class="flex flex-col gap-4">
                    <SkillCard
                        v-for="card in SkillCards.Cards.slice(2)"
                        :title="card.title"
                        :skills="card.skills" />
                </div>
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
import type { ChildrenProps, SkillBlock, Visual } from '~/server/models/page.schema';
import type { Header } from '../header/HeaderBlock.vue';

const props = defineProps<SkillBlock>();
if (props === undefined) throw Error;
const [Header, Visual, SkillCards]: [
    ChildrenProps['Header'],
    ChildrenProps['Visual'],
    ChildrenProps['SkillCards'],
] = props.children;
</script>

