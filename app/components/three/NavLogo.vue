<template>
    <TresCanvas alpha :clear-alpha="0" :dpr="[1, 2]" class="pointer-events-none">
        <NavLogoScene />
    </TresCanvas>
</template>
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core';

/**
 * Small rotating 3D version of the logo for the main navigation. Client-only: render it
 * as <ClientOnly><LazyNavLogo /></ClientOnly> so three.js stays out of the entry bundle.
 */
</script>
