<template>
    <header ref="headerBlock" class="flex items-center gap-x-4">
        <h2
            class="relative text-xl lg:text-2xl xl:text-3xl"
            :class="{ 'mb-auto line-clamp-3': trim, 'inline': !trim }">
            <span class="text-primary">{{ prefix ?? '#' }}</span
            >{{ title }}
        </h2>
        <span
            v-if="showBorder"
            class="animate-border header-animation relative h-[1px] w-full bg-primary">
            <SvgComponent
                icon="Electric-line-stretch"
                class="pointer-events-none absolute top-0 h-16 w-full -translate-y-1/2" />
            <SvgComponent
                icon="Electric-line-stretch-blue"
                class="pointer-events-none absolute top-0 h-16 w-full -translate-y-1/2" />
        </span>

        <NuxtLink v-if="link" :to="link.url" class="ml-auto">{{ link.label }}</NuxtLink>
    </header>
    <span
        v-if="subTitle"
        class="mt-3 text-gray"
        :class="{ 'mt-auto line-clamp-4': trim, 'block': !trim }"
        >{{ subTitle }}</span
    >
</template>
<script lang="ts" setup>
export type Header = {
    alias?: string;
    title: string;
    prefix?: string;
    link?: {
        url: string;
        label: string;
    };
    showBorder?: boolean;
    subTitle?: string;
    trim?: boolean;
};

defineProps<Header>();

const headerBlock = ref<HTMLElement | null>(null);
const isInView = ref(false);

onMounted(() => {
    const root = document.querySelector('.header-animation') as HTMLSpanElement;
    if (root === null) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isInView.value = true;
                    animateHeader(root);
                } else {
                    isInView.value = false;
                }
            });
        },
        { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (headerBlock.value) {
        observer.observe(headerBlock.value);
    }
});
</script>
<style scoped lang="scss">
.animate-border {
    background-image: linear-gradient(
        to left,
        #187adc,
        #3488dc 30%,
        #ffffff 45%,
        #3488dc,
        #ffffff 55%,
        #3488dc 70%,
        #187adc
    );
    background-size: 300%;
    animation: background-shift 5s infinite;

    path {
        stroke: transparent;
    }
}

@keyframes background-shift {
    0% {
        background-position: 100%;
    }
    100% {
        background-position: 0%;
    }
}
</style>

