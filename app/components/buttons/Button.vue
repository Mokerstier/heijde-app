<template>
    <component
        :is="htmlTag"
        v-magnetic="variant === 'primary' ? 0.3 : 0"
        class="btn"
        :title="title"
        :class="[
            `btn--${variant}`,
            `btn--${size}`,
            `btn--icon-${iconPosition}`,
            { 'btn--has-icon': icon !== undefined },
        ]">
        <span
            v-if="icon && iconPosition === 'left'"
            class="icon flex items-center self-start"
            :class="[{ 'h-[35px] w-[35px] p-[8px] px-[7.5px]': size === 'small' }]">
            <SvgComponent
                :width="size === 'large' ? 25 : 20"
                :height="size === 'large' ? 21 : 19"
                :icon="icon" />
        </span>
        <span
            :data-text="title"
            class="my-auto inline-flex flex-col justify-between self-start text-left no-underline"
            :class="{
                'py-[3px]': size === 'small',
                'layout-shift-fix': size === 'small',
            }">
            <slot />
        </span>
        <span
            v-if="icon && iconPosition === 'right'"
            class="icon flex items-center"
            :class="[{ 'h-[35px] w-[35px] p-[8px] px-[7.5px]': size === 'small' }]">
            <SvgComponent
                :width="size === 'large' ? 25 : 20"
                :height="size === 'large' ? 21 : 19"
                :icon="icon" />
        </span>
    </component>
</template>
<script lang="ts" setup>
import type { Icon } from '../SvgComponent.vue';

type ButtonVariant = 'primary' | 'secondary' | 'navigation';
type ButtonSize = 'large' | 'small';

type IconPosition = 'left' | 'right';

interface ButtonProps {
    asLink?: boolean;
    icon?: Icon;
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconPosition?: IconPosition;
    title?: string;
}

const {
    icon = undefined,
    iconPosition = 'right',
    size = 'large',
    variant = 'primary',
    asLink = false,
} = defineProps<ButtonProps>();

const htmlTag = computed(() => (asLink ? resolveComponent('NuxtLink') : 'button'));
</script>
<style>
@reference '~/assets/css/main.css';

.btn--primary {
    @apply relative z-0 overflow-hidden bg-ink px-4 py-2 font-medium text-white outline outline-1 outline-primary transition-all hover:outline-hidden active:scale-95;
    filter: drop-shadow(0 0 0.75rem color-mix(in oklab, var(--color-primary) 28%, transparent));

    &:hover {
        filter: drop-shadow(0 0 0.75rem color-mix(in oklab, var(--color-primary) 75%, transparent));
    }

    &:hover::before {
        content: '';
        position: absolute;
        z-index: -2;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        background-repeat: no-repeat;
        border-radius: 50%;
        background-position: 0 0;
        background-image: conic-gradient(transparent, var(--color-primary), transparent 30%);
        animation: rotate 4s linear infinite;
    }

    &:hover::after {
        @apply bg-ink;
        content: '';
        position: absolute;
        z-index: -1;
        left: 1px;
        top: 1px;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
    }
}

.btn--secondary {
    @apply relative transition-colors;

    &:hover {
        @apply text-white;
    }

    &::after {
        @apply absolute -bottom-1 left-0 h-0.5 w-full bg-primary;
        content: '';
        transform: scaleX(0);
        transform-origin: 0 0;
        transition: transform 0.3s;
    }

    &:hover::after {
        transform: scaleX(1);
    }
}

.btn.active {
    @apply text-white;

    &::after {
        transform: scaleX(1);
    }
}

.btn--navigation {
    @apply transition-colors;

    &:hover {
        @apply text-white;
    }
}

.btn--small {
    @apply px-3 py-1 text-sm;
}

@keyframes rotate {
    100% {
        transform: rotate(1turn);
    }
}
</style>

