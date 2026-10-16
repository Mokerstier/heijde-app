<template>
    <section ref="root" class="container">
        <HeaderBlock title="fun facts" sub-title="get to know me a little better" />
        <div class="relative grid md:grid-cols-3">
            <div class="col-span-2 mt-4 flex flex-wrap items-center gap-4 text-muted">
                <p class="fact">I'm a <span class="text-white">LEGO </span>star-wars nerd</p>
                <p class="fact">I've got <span class="text-white" data-count="2">2</span> sisters</p>
                <p class="fact">
                    I've studied
                    <Button
                        variant="secondary"
                        :as-link="true"
                        class="text-white"
                        target="_blank"
                        to="https://www.hva.nl/opleidingen/communication-and-multimedia-design"
                        >Communucation and Multimedia Design</Button
                    >
                </p>
                <p class="fact">
                    <Button
                        variant="secondary"
                        :as-link="true"
                        class="text-white"
                        target="_blank"
                        to="https://www.imdb.com/title/tt4158110/"
                        >Mr. Robot</Button
                    >

                    is my favorite serie
                </p>
                <p class="fact">
                    I live in a place called
                    <SvgComponent class="mr-2 inline h-5 w-5" icon="Landmark" />

                    <Button
                        variant="secondary"
                        :as-link="true"
                        class="text-white"
                        target="_blank"
                        to="https://g.co/kgs/iNwiBt6"
                        >Bigpants</Button
                    >
                </p>
                <p class="fact">I've been a truck driver for
                    <span class="text-white" data-count="5" data-suffix="+">5+</span> years</p>
            </div>
            <div class="absolute -z-10 w-full md:relative">
                <SvgComponent
                    class="absolute -bottom-[15rem] right-10 h-36 w-36 text-primary md:left-1/3 md:top-16 lg:right-28"
                    icon="w-logo-outline" />
                <SvgComponent
                    class="md:left-18 absolute right-14 h-16 md:right-[unset] md:top-6"
                    icon="Dots" />
            </div>
        </div>
    </section>
</template>
<script lang="ts" setup>
const root = ref<HTMLElement | null>(null);

// Facts pop in one after another and the numbers count up from zero.
useGsap(root, ({ gsap, reducedMotion }) => {
    if (reducedMotion) return;

    const facts = gsap.utils.toArray<HTMLElement>('.fact', root.value);
    gsap.from(facts, {
        autoAlpha: 0,
        y: 24,
        scale: 0.96,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: { trigger: facts[0], start: 'top 85%', once: true },
    });

    gsap.utils.toArray<HTMLElement>('[data-count]', root.value).forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? '';
        const counter = { value: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(counter, {
            value: target,
            duration: 1.5,
            ease: 'power1.out',
            snap: { value: 1 },
            onUpdate: () => {
                el.textContent = `${counter.value}${suffix}`;
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
    });
});
</script>
<style scoped>
@reference '~/assets/css/main.css';
.fact {
    @apply border border-line bg-ink px-3 py-2;
}
</style>

