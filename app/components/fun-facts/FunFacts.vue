<template>
    <section class="container">
        <HeaderBlock title="fun facts" sub-title="get to know me a little better" />
        <div class="relative grid md:grid-cols-3">
            <div class="col-span-2 mt-4 flex flex-wrap items-center gap-4 text-gray">
                <p class="fact">I'm a <span class="text-white">LEGO </span>star-wars nerd</p>
                <p class="fact">I've got 2 sisters</p>
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
                <p class="fact">I've been a truck driver for 5+ years</p>
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
<style scoped lang="scss">
.fact {
    @apply border border-gray bg-slate px-3 py-2;
}
</style>

