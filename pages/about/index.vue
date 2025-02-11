<template>
    <div>
        <section class="container">
            <HeaderBlock
                :prefix="header?.prefix"
                :title="header?.title"
                :sub-title="header?.subTitle"></HeaderBlock>
        </section>
        <section class="container grid gap-4 text-gray lg:grid-cols-2">
            <div class="flex flex-col gap-4">
                <p>Hey there! I’m Wouter,</p>
                <p>
                    a passionate Front-End Developer with a love for crafting sleek, user-friendly
                    websites and applications. With experience in Nuxt.js, Next.js, TypeScript,
                    Tailwind, SCSS, and Jest, I’m dedicated to writing clean, efficient code that
                    makes an impact.
                </p>
                <p>
                    When I’m not building the next great web experience, you can find me
                    skateboarding around town, sketching ideas, or working in my garden. I also
                    enjoy expressing myself through graffiti art, and I love the challenge of
                    blending creativity with tech. My greatest achievement, though, has been
                    becoming a dad to an amazing little girl who’s almost one—she keeps me inspired
                    every day!
                </p>
                <p>
                    I take pride in balancing a casual yet professional approach to my work, always
                    focused on delivering high-quality results with a personal touch. Whether you’re
                    looking for a custom web solution or a little design magic, I’m here to help
                    bring your vision to life.
                </p>
                <p>
                    If you'd like to work together or just chat about tech, feel free to reach out!
                </p>
            </div>
            <div class="relative flex items-center justify-center">
                <SvgComponent class="absolute left-20 top-6 h-21" icon="Dots" />
                <NuxtImg
                    fit="contain"
                    class="max-h-[500px] max-w-full scale-x-[-1] border-b border-b-primary lg:min-h-[500px] lg:min-w-max"
                    src="/images/wouter-mila-no-bg.png"></NuxtImg>
                <SvgComponent class="absolute right-16 top-2/3 h-21" icon="Dots" />
            </div>
        </section>
        <FunFacts />
    </div>
</template>
<script setup lang="ts">
import type { ContentHeader, ContentSection } from '~/server/models/page.schema';
import { getElementByType } from '~/utils/getElementByType';

const data = await usePageData('about-me');

const header = ref<ContentHeader | undefined>();
const contentSection = ref<ContentSection | undefined>();

useHead({
    title: 'About | Wouter van der Heijde',
    meta: [
        {
            name: 'description',
            content:
                'I’m Wouter, a passionate Front-End Developer with a love for crafting sleek, user-friendly websites and applications.',
        },
    ],
});

onMounted(() => {
    header.value = getElementByType(data.value.template);
    contentSection.value = getElementByType(data.value.template);
});
</script>
