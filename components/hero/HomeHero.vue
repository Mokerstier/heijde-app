<template>
    <section class="container grid grid-cols-1 gap-x-4 md:grid-cols-2">
        <div class="flex flex-col items-start justify-center">
            <h1 class="mb-6 font-nico-moji text-4xl lg:mb-12 lg:whitespace-nowrap">
                <span>Wouter is a<span v-show="currentWordStartsWithVowel">n</span></span>
                <span
                    ref="typewriter"
                    class="blink-cursor block min-h-10 max-w-max text-primary lg:inline">
                    {{ currentWord }}
                </span>
                <span class="block text-primary"> full-stack developer </span>
            </h1>
            <p class="mb-6 text-gray">
                He builds accesible user experiences, that adds value to your business
            </p>
            <Button :as-link="true" to="mailto:wouter.van.der.heijde@outlook.com"
                >Contact me!</Button
            >
        </div>
        <div class="relative z-0 flex items-center justify-center">
            <SvgComponent
                class="absolute left-0 top-12 -z-10 h-40 w-40 md:left-5 lg:top-20"
                icon="w-logo-outline"></SvgComponent>
            <div class="relative h-[385px] w-[433px] overflow-hidden">
                <NuxtImg
                    class="-mt-4 w-full object-cover"
                    fit="cover"
                    top="0"
                    src="images/hero-img.png"></NuxtImg>
                <MiniBanner label="Currently working on" highlight="Portfolio" />
            </div>
            <SvgComponent
                class="absolute bottom-20 right-0 h-21 w-21 md:right-5"
                icon="Dots"></SvgComponent>
        </div>
    </section>
</template>
<script lang="ts" setup>
const words = [' creative', ' passionate', ' dedicated', ' curious', ' enthusiastic'];
const currentWord = ref('');
const wordIndex = ref(0);
const charIndex = ref(0);
const typingSpeed = 150;
const deletingSpeed = 100;
const delayBetweenWords = 2000;
const currentWordStartsWithVowel = computed(() => {
    const firstLetter = currentWord.value.charAt(1);
    return ['a', 'e', 'i', 'o', 'u'].includes(`${firstLetter}`);
});

const deleteWord = () => {
    if (charIndex.value > 0) {
        currentWord.value = currentWord.value.substring(0, currentWord.value.length - 1);
        charIndex.value--;
        setTimeout(deleteWord, deletingSpeed);
    } else {
        wordIndex.value = (wordIndex.value + 1) % words.length;
        setTimeout(typewrite, typingSpeed);
    }
};

const typewrite = () => {
    const newWord = words[wordIndex.value];
    if (charIndex.value < newWord.length) {
        currentWord.value += newWord.charAt(charIndex.value);
        charIndex.value++;
        setTimeout(typewrite, typingSpeed);
    } else {
        setTimeout(deleteWord, delayBetweenWords);
    }
};

onMounted(() => {
    typewrite();
});
</script>
<style>
.blink-cursor {
    @apply border-r-2 border-primary/75;
    animation: blinkTextCursor 500ms infinite normal;
}
@keyframes blinkTextCursor {
    from {
        @apply border-r-primary/75;
    }
    to {
        border-right-color: transparent;
    }
}
</style>
