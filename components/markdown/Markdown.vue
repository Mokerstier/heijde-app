<template>
    <div class="markdown" v-html="marked(content)" />
</template>
<script lang="ts" setup>
import { marked } from 'marked';

defineProps<{
    content: string;
}>();
</script>
<style lang="scss">
.markdown {
    h1 {
        font-size: 2em;
        margin-top: 0;
    }

    h2 {
        @apply my-4 text-2xl;
    }

    h3 {
        @apply my-4 text-xl;
    }

    p {
        @apply mb-4 text-gray;
    }

    a {
        @apply text-primary;
    }

    ul {
        @apply mb-4 list-disc pl-6;
    }

    blockquote {
        @apply mb-4 border-l-4 border-primary bg-zinc-950 p-4;

        p {
            @apply mb-0 text-white;
        }
    }

    pre {
        @apply mb-4 overflow-auto bg-zinc-950;
    }
    code {
        @apply inline max-w-full bg-zinc-950 text-primary;
    }

    img {
        @apply my-2;
    }
}
</style>
