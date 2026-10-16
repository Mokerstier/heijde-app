<template>
    <div
        id="pt-overlay"
        aria-hidden="true"
        class="pointer-events-none invisible fixed inset-0 z-100 overflow-hidden">
        <div class="pt-panel absolute inset-0 bg-accent" />
        <div class="pt-panel absolute inset-0 bg-primary" />
        <div class="pt-panel absolute inset-0 flex items-center justify-center bg-ink">
            <span id="pt-label" class="font-display text-5xl font-bold tracking-tight md:text-8xl" />
        </div>
    </div>
</template>
